import {
  AnyComponentBuilder,
  ApplicationCommandOption,
  ApplicationCommandOptionType,
  ButtonInteraction,
  Channel,
  ChatInputCommandInteraction,
  Client,
  CommandInteraction,
  DMChannel,
  EmbedBuilder,
  Interaction,
  InteractionCollector,
  RESTPostAPIChatInputApplicationCommandsJSONBody,
  SelectMenuInteraction,
  SlashCommandBuilder,
  TextChannel,
} from "discord.js";
import fs from "fs";
import mongoose, { Model } from "mongoose";
import { menuInfo } from "./typings";
import { client } from "../index";
import menuSchema from "./models/menuSchema";
import {
  commandobject,
  subcommandobject,
  subcommandArray,
  returnMenu,
  menuobject,
  buttonobject,
  buttonArray,
} from "./typings";

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
    }): returnMenu {
      return object.default.create({
        client: options.client,
        waitingForResponse: options.waitingForResponse,
        guildId: options.guildId,
        channelId: options.channelId,
        userId: options.userId,
        Indms: options.Indms,
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
      ): AnyComponentBuilder {
        return object.default.callback(
          client,
          guildId,
          channelId,
          userId,
          Indms
        );
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
  content?: string;
  embeds?: EmbedBuilder[];
  rows?: Array<String[]>;
  client!: Client;
  guildId?: String;
  channelId?: String;
  userId?: String;
  Indms?: Boolean;
  constructor(options: {
    content?: string;
    embeds?: EmbedBuilder[];
    rows?: Array<String[]>;
    client: Client;
    guildId?: String;
    channelId?: String;
    userId?: String;
    Indms?: Boolean;
  }) {
    this.init(options);
  }
  async init(options: {
    content?: string;
    embeds?: EmbedBuilder[];
    rows?: Array<String[]>;
    client: Client;
    guildId?: String;
    channelId?: String;
    userId?: String;
    Indms?: Boolean;
  }): Promise<returnMenu> {
    let menu: returnMenu = {};
    menu.content = options.content;
    menu.embeds = options.embeds;
    this.Indms;

    options.rows?.forEach((buttons) => {
      let row: AnyComponentBuilder[] = new Array();
      buttons.forEach(async (buttonName) => {
        let buttonobject = (await buttonsExport).find(
          (button) => button.name == buttonName
        );
        let button: AnyComponentBuilder = buttonobject?.create(
          this.client,
          this.guildId,
          this.channelId,
          this.userId,
          this.Indms
        );
        row.push(button);
      });
    });

    return menu;
  }
}

export const Menus = {
  create: async (options: {
    menu: string;
    where: CommandInteraction | DMChannel | TextChannel | String;
    saveMenu?: boolean;
    deleteAfter: number;
    waitingForResponse?: boolean;
    userIds?: string[];
    saveState?: boolean;
    ephemeral?: boolean
  }) => {
    let menu = new menuSchema();
    if (menu.waitingForResponse) {
      menu.waitingForResponse = options.waitingForResponse;
    } else {
      menu.waitingForResponse = false;
    }
    if (options.saveMenu) {
      menu.saveMenu = options.saveMenu;
    } else {
      menu.saveMenu = false;
    }
    menu.deleteAfter = options.deleteAfter;
    if (options.saveState) {
      menu.saveState = options.saveState;
    } else {
      menu.saveState = false;
    }
    menu.currentMenu = options.menu;
    if (
      options.where instanceof DMChannel ||
      options.where instanceof TextChannel
    ) {


    } else if (options.where instanceof CommandInteraction) {
      const channel = options.where.channel

    } else if (typeof options.where === 'string') {
      const channel = await client.channels.fetch(options.where)

    }
    //code here coninuuue
    
  },
  update: async (options: {
    menu?: string | "back";
    messageId: string;
    saveMenu?: boolean;
    deleteAfter?: Number;
    waitingForResponse?: boolean;
    userIds?: { ids: string[]; mode: "set" | "add" | "remove" };
    saveState?: boolean;
  }) => {},
  delete: async (ptions: { messageId: string }) => {},
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
            channel.messages.fetch(menu.messageId || "").then((message) => {
              message.delete();
            });
          }
          menu.delete();
        }
      }
    }
  });
}, 60000);
