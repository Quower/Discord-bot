import {
  ActionRowBuilder,
  ActionRowData,
  AnyComponentBuilder,
  APIActionRowComponent,
  APIMessageActionRowComponent,
  ApplicationCommandOption,
  ApplicationCommandOptionType,
  BaseMessageOptions,
  ButtonInteraction,
  Channel,
  ChatInputCommandInteraction,
  Client,
  CommandInteraction,
  DMChannel,
  EmbedBuilder,
  Interaction,
  InteractionCollector,
  JSONEncodable,
  MessageActionRowComponentBuilder,
  MessageActionRowComponentData,
  RESTPostAPIChatInputApplicationCommandsJSONBody,
  SelectMenuInteraction,
  SlashCommandBuilder,
  TextChannel,
} from "discord.js";
import fs from "fs";
import mongoose, { Model } from "mongoose";
import { menuInfo, returnMenu } from "./typings";
import { client } from "../index";
import menuSchema from "./models/menuSchema";
import {
  commandobject,
  subcommandobject,
  subcommandArray,
  menuobject,
  buttonobject,
  buttonArray,
} from "./typings";
import menu from "../menus/deleteVcGeneratorConfirm/menu";
import { ExitStatus } from "typescript";

const commandfolders = fs.readdirSync("./commanddirs");
let commands = new Array<commandobject>();
commandfolders.forEach((folder) => {
  const name = folder;
  const path = `./commanddirs/${folder}/`;
  const object = require(`.${path}main.ts`);
  const subcommands = Setup_Subcommands(`${path}subcommands/`);
  const subcommand = {
    command: name,
    description: object.default.description,
    path: path,
    subcommands: subcommands,
    callback: function (client: Client, interaction: CommandInteraction) {
      object.default.callback(client, interaction);
    },
    options: object.default.options || null,
    allowInDMs: object.default.allowInDMs || false,
    ownerOnly: object.default.ownerOnly || false,
    testOnly: object.default.testOnly || false,
    permissions: object.default.permissions || null,
    ManinCommand: object.default.ManinCommand || false,
  } as commandobject;

  commands.push(subcommand);
});

const menufolders = fs.readdirSync("./menus");
let menus = new Array<menuobject>();
menufolders.forEach((folder) => {
  const name = folder;
  const path = `./menus/${folder}/`;
  const object = require(`.${path}menu.ts`);
  //const buttons = Setup_Buttons(`${path}buttons/`);
  const menu = {
    path: path,
    create: function (options: {
      client: Client;
      waitingForResponse: boolean;
      guildId?: String;
      channelId?: String;
      userId?: String;
      Indms?: Boolean;
      data?: any;
    }): Promise<returnMenu> {
      return object.default.create({
        client: options.client,
        waitingForResponse: options.waitingForResponse,
        guildId: options.guildId,
        channelId: options.channelId,
        userId: options.userId,
        Indms: options.Indms,
        data: options.data,
      });
    },
    name: name,
    //buttons: buttons,
  } as menuobject;

  menus.push(menu);
});

let buttons: buttonArray = new Array();
menus.forEach((menu) => {
  const buttonfiles = fs
    .readdirSync(`${menu.path}buttons/`)
    .filter((file) => file.endsWith(".ts"));
  buttonfiles.forEach((file) => {
    const name = file.split(".")[0];
    const path = `${menu.path}buttons/${file}`;
    const object = require(`.${path}`);
    const button: buttonobject = {
      name: name,
      path: path,
      callback: function (
        client: Client,
        interaction: ButtonInteraction | SelectMenuInteraction,
        model: Model<any>
      ) {
        object.default.callback(client, interaction, model);
      },
      create: function (
        client: Client,
        guildId?: String,
        channelId?: String,
        userId?: String,
        Indms?: Boolean
      ): Promise<AnyComponentBuilder> {
        return object.default.create(client, guildId, channelId, userId, Indms);
      },
    } as buttonobject;

    buttons.push(button);
  });
});

export function Setup_Subcommands(folder: fs.PathLike): subcommandArray {
  const subcommandfiles = fs
    .readdirSync(folder)
    .filter((file) => file.endsWith(".ts"));
  let subcommands: subcommandobject[] = new Array();

  subcommandfiles.forEach((file) => {
    const name = file.split(".")[0];
    const path = `${folder}${file}`;
    const object = require(`.${path}`);

    const subcommand = {
      command: name,
      description: object.default.description,
      path: path,
      callback: function (client: Client, interaction: CommandInteraction) {
        object.default.callback(client, interaction);
      },
      options: object.default.options,
    } as subcommandobject;

    subcommands.push(subcommand);
  });

  return subcommands;
}

/*export function Setup_Buttons(folder: fs.PathLike): buttonobject[] {
  const buttonfiles = fs
    .readdirSync(folder)
    .filter((file) => file.endsWith(".ts"));
  let buttons: buttonobject[] = new Array();

  buttonfiles.forEach((file) => {
    const name = file.split(".")[0];
    const path = `${folder}${file}`;
    const object = require(`.${path}`);

    const subcommand = {
      name: name,
      path: path,
      callback: function (client: Client, interaction: CommandInteraction) {
        object.default.callback(client, interaction);
      },
      label: object.default.label || "nolabel",
      style: object.default.style || ButtonStyle.Primary,
      emoji: object.default.emoji || null,
    } as buttonobject;

    buttons.push(subcommand);
  });

  return buttons;
}*/

export const commandsExport = commands;
export const menusExport = menus;
export const buttonsExport = buttons;

export default class Handler {
  testServers!: String[];
  client!: Client<boolean>;
  botOwners!: String[];
  mongoUri!: String;
  constructor(options: {
    client: Client;
    mongoUri: string;
    testServers?: string[] | undefined;
    botOwners?: string[] | undefined;
  }) {
    this.init(options);
  }
  async init(options: {
    client: Client;
    mongoUri?: string;
    testServers?: string[];
    botOwners?: string[];
  }) {
    let { client, mongoUri = "", testServers = [], botOwners = [] } = options;
    this.client = client;
    this.testServers = testServers;
    this.botOwners = botOwners;
    this.mongoUri = mongoUri;

    let commandArray = new Array();
    // client.application?.commands

    let guildCommands =
      Array<RESTPostAPIChatInputApplicationCommandsJSONBody>();
    let globalCommands =
      Array<RESTPostAPIChatInputApplicationCommandsJSONBody>();
    commands.forEach((command) => {
      let options = command.options || [];

      command.subcommands.forEach((subcommand) => {
        const option: ApplicationCommandOption = {
          name: subcommand.command,
          type: ApplicationCommandOptionType.Subcommand,
          description: `${subcommand.description}`,
          options: subcommand.options || [],
        };

        options.push(option);
      });

      let commandBuilder = new SlashCommandBuilder();

      commandBuilder.setName(command.command);
      commandBuilder.default_member_permissions;
      if ((command.MainCommand = true)) {
        commandBuilder.setDescription(command.description);
      }
      commandBuilder.setDMPermission(command.allowInDMs);
      let commandJSON = commandBuilder.toJSON();
      commandJSON.options = options;

      if ((command.testOnly = true)) {
        guildCommands.push(commandJSON);
      } else if ((command.testOnly = false)) {
        globalCommands.push(commandJSON);
      }
    });

    await mongoose.default.connect(mongoUri, {
      keepAlive: true,
    });

    // console.log(
    //   `${JSON.stringify(
    //     globalCommands,
    //     null,
    //     "  "
    //   )}\n///////////////////////////////\n${JSON.stringify(
    //     guildCommands,
    //     null,
    //     "  "
    //   )}`
    // );
    /*console.log(menus);
    let test = menus.find(
      (menu) =>
        menu.name == "deleteVcGeneratorSelector"
    );
    console.log(test)*/
    testServers.forEach(async (testServer) => {
      let guild = await client.guilds.fetch(testServer);
      if (!guild) {
        return;
      }
      guild.commands.set(guildCommands);
    });
    client.application?.commands.set(globalCommands);
  }
  async testfunction(options: {
    content?: string;
    embeds?: EmbedBuilder[];
    rows?: Array<String[]>;
    client: Client;
    guildId?: String;
    channelId?: String;
    userId?: String;
    Indms?: Boolean;
  }) {}
}

export class UkMessageBuilder {
  async build(options: {
    content?: string;
    embeds?: EmbedBuilder[];
    rows?: Array<String[]>;
    client: Client;
    guildId?: String;
    channelId?: String;
    userIds?: String[];
    Indms?: Boolean;
    data: any;
  }): Promise<returnMenu> {
    let menu: returnMenu = {};
    menu.content = options.content;
    menu.embeds = options.embeds;
    if (options.rows) {
      for (const buttons of options.rows) {
        const row = new ActionRowBuilder();
        //console.log(buttons)
        for (const buttonName of buttons) {
          //console.log(buttonsExport)
          let buttonobject = buttonsExport.find(
            (button) => button.name == buttonName
          );
          if (!buttonobject) {
          throw console.error(`button "${buttonName}" not found`);
          }
          let button = await buttonobject?.create(
            options.client,
            options.guildId,
            options.channelId,
            options.userIds,
            options.Indms,
            options.data
          );
          if (button) {
            button.setCustomId(buttonName);
            row.addComponents(button);
          }
        }
        if (menu.components) {
          menu.components?.push(row);
        } else {
          menu.components = [row];
        }
      }
    }

    return menu;
  }
}
export const Menus = {
  create: async (options: {
    menu: string;
    client: Client;
    where: ChatInputCommandInteraction | DMChannel | TextChannel | String;
    saveMenu?: boolean;
    deleteAfter: number;
    waitingForResponse?: boolean;
    userIds?: string[];
    saveState?: boolean;
    ephemeral?: boolean;
    data?: any;
  }) => {
    let menu = new menuSchema();
    if (menu.waitingForResponse) {
      const generators = await menuSchema.find({ waitingForResponse: true });
      if (generators) {
        menu.waitingForResponse = false;
      } else {
        menu.waitingForResponse = true;
      }
    } else {
      menu.waitingForResponse = false;
    }
    if (options.saveMenu) {
      menu.saveMenu = options.saveMenu;
    } else {
      menu.saveMenu = false;
    }
    menu.data = options.data;
    menu.deleteAfter = options.deleteAfter;
    if (options.saveState) {
      menu.saveState = options.saveState;
    } else {
      menu.saveState = false;
    }
    menu.currentMenu = options.menu;
    menu.prevMenus = new Array();
    if (options.userIds) {
      menu.userIds = options.userIds;
    } else {
      menu.userIds = [];
    }
    let menuObject = (await menusExport).find(
      (menu) => menu.name == options.menu
    );
    if (!menuObject) {
      console.log("no menu found");
      return;
    }
    options.client;
    let sendplace: DMChannel | TextChannel | CommandInteraction | undefined =
      undefined;
    if (
      options.where instanceof DMChannel ||
      options.where instanceof TextChannel
    ) {
      if (options.where instanceof DMChannel) {
        menu.inDms = true;
      } else {
        menu.inDms = false;
      }
      sendplace = options.where;
    } else if (options.where instanceof CommandInteraction) {
      const channel = options.where.channel;
      if (channel instanceof DMChannel) {
        menu.inDms = true;
      } else {
        menu.inDms = false;
      }
      sendplace = options.where;
    } else if (typeof options.where === "string") {
      const channel = await client.channels.fetch(options.where);
      if (channel instanceof DMChannel || channel instanceof TextChannel) {
        if (channel instanceof DMChannel) {
          menu.inDms = true;
        } else {
          menu.inDms = false;
        }
        sendplace = channel;
      }
    }
    if (sendplace instanceof DMChannel || sendplace instanceof TextChannel) {
      let guildId: string | undefined;
      if (sendplace instanceof TextChannel) {
        guildId = sendplace.guildId;
      }
      const message = await menuObject.create({
        client: options.client,
        waitingForResponse: menu.waitingForResponse,
        userIds: options.userIds,
        Indms: menu.inDms,
        data: options.data,
        guildId: guildId,
        channelId: sendplace.id,
      });
      console.log(JSON.stringify(message, null, "  "));
      await sendplace
        .send({
          components: message.components,
          content: message.content,
          embeds: message.embeds,
        })
        .then((msg) => {
          menu.messageId = msg.id;
          menu.guildId = msg.guildId || undefined;
          menu.channelId = msg.channelId;
        });
    } else if (sendplace instanceof CommandInteraction) {
      let guildId: string | undefined;
      if (sendplace.channel instanceof TextChannel) {
        guildId = sendplace.channel.guildId;
      }
      const message = await menuObject.create({
        client: options.client,
        waitingForResponse: menu.waitingForResponse,
        userIds: options.userIds,
        Indms: menu.inDms,
        data: options.data,
        guildId: guildId,
        channelId: sendplace.id,
      });
      message.ephemeral = options.ephemeral;
      console.log(JSON.stringify(message, null, "  "));
      await sendplace.reply({
        components: message.components,
        content: message.content,
        ephemeral: message.ephemeral,
        embeds: message.embeds,
      });
      const msg = await sendplace.fetchReply();
      menu.messageId = msg.id;
      menu.guildId = msg.guildId || undefined;
      menu.channelId = msg.channelId;
    }
    menu.lastInteraction = Date.now();
    menu.save();
    return;
  },
  update: async (options: {
    menu?: string | "back";
    messageId: string;
    saveMenu?: boolean;
    client: Client;
    deleteAfter?: number;
    waitingForResponse?: boolean;
    userIds?: { ids: string[]; mode: "set" | "add" | "remove" };
    saveState?: boolean;
    data?: any;
  }) => {
    const menudb = await menuSchema.findOne({ messageId: options.messageId });
    if (!menudb) {
      return;
    }
    let menuName: string;
    let back = false;
    let data: any;
    let waitingForResponse: boolean;
    if (options.menu) {
      if (options.menu == "back") {
        const last = menudb?.prevMenus[menudb.prevMenus.length - 1];
        if (!last) {
          Menus.delete({
            messageId: options.messageId,
            client: options.client,
          });
          return;
        }
        back = true;
        menuName = last.name;
        data = last.data;
        waitingForResponse = last.data;
      } else {
        menuName = options.menu;
        if (options.waitingForResponse) {
          waitingForResponse = options.waitingForResponse;
        } else {
          waitingForResponse = false;
        }
        if (options.data) {
          console.log(options.data)
          data = options.data;
        }
      }
    } else {
      menuName = menudb?.currentMenu || "";
      if (options.waitingForResponse) {
        waitingForResponse = options.waitingForResponse;
      } else {
        waitingForResponse = menudb.waitingForResponse || false;
      }
      if (options.data) {
        data = options.data;
      } else {
        data = menudb.data;
      }
    }
    if (options.deleteAfter) {
      menudb.deleteAfter = options.deleteAfter;
    }
    if (options.userIds) {
      switch (options.userIds.mode) {
        case "set":
          menudb.userIds = options.userIds.ids;
          break;
        case "add":
          menudb.userIds.concat(options.userIds.ids);
          break;
        case "remove":
          for (const userid of options.userIds.ids) {
            let index = menudb.userIds.indexOf(userid);
            if (index !== -1) {
              menudb.userIds.splice(index, 1);
            }
          }
          break;
      }
    }
    if (back == true) {
      menudb?.prevMenus.pop();
    } else if (menudb.saveMenu == true) {
      const menuI: menuInfo = {
        name: menuName,
        waitingForResponse: waitingForResponse,
        data: data,
      };
      menudb.prevMenus.push(menuI);
    }
    if (options.saveMenu) {
      menudb.saveMenu = options.saveMenu
    } else {
      menudb.saveMenu = true
    }
    let menuObject = (await menusExport).find(
      (menu) => menu.name == menuName
    );
    if (!menuObject) {
      console.log("no menu found and ur code is fucked");
      return;
    }
    console.log(`${data}    hhhh`)
    const message = await menuObject.create({
      client: options.client,
      waitingForResponse: waitingForResponse,
      userIds: menudb.userIds,
      Indms: menudb.inDms,
      data: data,
      guildId: menudb.guildId,
      channelId: menudb.channelId,
    });
    const channel = await client.channels.fetch(menudb.channelId || '');
    console.log(`${menudb.data}       fff`)
    if (channel instanceof DMChannel || channel instanceof TextChannel) {
      const msg = await channel.messages.fetch(options.messageId);
      console.log(JSON.stringify(message, null, "  "));
      msg.edit(message).then(() => {
        menudb.lastInteraction = Date.now()
        menudb.save()
      })
    }
  },
  delete: async (options: { messageId: string; client: Client }) => {
    const menu = await menuSchema.findOne({ messageId: options.messageId });
    const channel = await client.channels.fetch(menu?.channelId || "");
    if (channel instanceof DMChannel || channel instanceof TextChannel) {
      const msg = await channel.messages.fetch(menu?.messageId || "");
      if (msg.deletable == true) {
        msg.delete();
      }
    }
    menu?.delete();
  },
};

setInterval(async () => {
  let menus = await menuSchema.find();
  menus.forEach(async (menu) => {
    if (menu.deleteAfter != 0) {
      if (menu.lastInteraction && menu.deleteAfter) {
        if (
          Date.now() - (menu.lastInteraction + menu.deleteAfter * 60000) >
          1
        ) {
          let channel = await client.channels.fetch(menu.channelId || "");
          if (channel instanceof DMChannel || channel instanceof TextChannel) {
            try {
              channel.messages.fetch(menu.messageId || "").then((message) => {
              try {
                message.delete();
              } catch (e) {
                console.log('could not find message')
              }
            });
            } catch (e) {
              console.log('could not find message')
            }
            
          }
          menu.delete();
        }
      }
    }
  });
}, 60000);
