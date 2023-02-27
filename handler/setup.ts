import {
  ActionRowBuilder,
  AnySelectMenuInteraction,
  ApplicationCommandOption,
  ApplicationCommandOptionType,
  ButtonInteraction,
  ChatInputCommandInteraction,
  Client,
  CommandInteraction,
  EmbedBuilder,
  MessageActionRowComponentBuilder,
  ModalBuilder,
  ModalSubmitInteraction,
  PermissionsBitField,
  RESTPostAPIChatInputApplicationCommandsJSONBody,
  SlashCommandBuilder,
} from "discord.js";
import fs from "fs";
import mongoose from "mongoose";
import { modalobject, returnMenu } from "./typings";
import {
  commandobject,
  subcommandobject,
  menuobject,
  buttonobject,
} from "./typings";

const commandfolders = fs.readdirSync("./commanddirs");
export let commandsExport = new Array<commandobject>();
commandfolders.forEach((folder) => {
  if (folder.endsWith(".ts")) {
    const name = folder.split(".")[0];
    const path = `./commanddirs/${folder}`;
    const object = require(`.${path}`);
    const subcommand = {
      command: name,
      description: object.default.description,
      path: path,
      subcommands: [],
      callback: function (client: Client, interaction: CommandInteraction) {
        object.default.callback(client, interaction);
      },
      options: object.default.options,
      allowInDMs: object.default.allowInDMs,
      ownerOnly: object.default.ownerOnly,
      testOnly: object.default.testOnly,
      permissions: object.default.permissions,
      MainCommand: object.default.MainCommand,
    } as commandobject;

    commandsExport.push(subcommand);
  } else {
    const name = folder;
    const path = `./commanddirs/${folder}/`;
    const object = require(`.${path}main.ts`);
    const subcommands = Setup_Subcommands(`${path}subcommands/`);
    //console.log(object)
    const subcommand = {
      command: name,
      description: object.default.description,
      path: path,
      subcommands: subcommands || [],
      callback: function (client: Client, interaction: CommandInteraction) {
        object.default.callback(client, interaction);
      },
      options: object.default.options,
      allowInDMs: object.default.allowInDMs,
      ownerOnly: object.default.ownerOnly,
      testOnly: object.default.testOnly,
      permissions: object.default.permissions,
      MainCommand: object.default.MainCommand,
    } as commandobject;
    //console.log(subcommand)

    commandsExport.push(subcommand);
  }
});
//console.log(commandsExport)

const menufolders = fs.readdirSync("./menus");
export let menusExport = new Array<menuobject>();
menufolders.forEach((folder) => {
  if (folder.endsWith(".ts")) {
    const name = folder.split(".")[0];
    const path = `./menus/${folder}`;
    const object = require(`.${path}`);
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
  } else {
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

    menusExport.push(menu);
  }
});

export let buttonsExport: buttonobject[] = new Array();
menusExport.forEach((menu) => {
  if (fs.existsSync(`${menu.path}buttons/`)) {
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
        callback: function (options: {
          client: Client;
          interaction: ButtonInteraction | AnySelectMenuInteraction;
          data?: any;
          waitingForResponse: boolean;
        }) {
          object.default.callback({
            client: options.client,
            interaction: options.interaction,
            data: options.data,
            waitingForResponse: options.waitingForResponse,
          });
        },
        create: function (options: {
          client: Client;
          guildId?: string;
          channelId: string;
          userIds: string[];
          Indms: boolean;
          data?: any;
          waitingForResponse: boolean;
        }): Promise<MessageActionRowComponentBuilder> {
          return object.default.create({
            client: options.client,
            guildId: options.guildId,
            channelId: options.channelId,
            userIds: options.userIds,
            InDms: options.Indms,
            data: options.data,
            waitingForResponse: options.waitingForResponse,
          });
        },
      } as buttonobject;

      buttonsExport.push(button);
    });
  }
});

const modalfiles = fs.readdirSync("./modals");
export let modalExports = new Array<modalobject>();
modalfiles.forEach((modal) => {
  const name = modal.split(".")[0];
  const path = `./modals/${modal}`;
  const object = require(`.${path}`);
  const Modal: modalobject = {
    name: name,
    path: path,
    callback: function (options: {
      client: Client;
      interaction: ModalSubmitInteraction;
      data?: any;
    }) {
      object.default.callback({
        client: options.client,
        interaction: options.interaction,
        data: options.data,
      });
    },
    create: function (
      options: {
        client: Client;
        interaction:
          | ButtonInteraction
          | AnySelectMenuInteraction
          | ChatInputCommandInteraction;
        data?: any;
      },
      modal: ModalBuilder
    ) {
      object.default.create(
        {
          client: options.client,
          interaction: options.interaction,
          data: options.data,
        },
        modal
      );
    },
  } as modalobject;

  modalExports.push(Modal);
});

function Setup_Subcommands(
  folder: fs.PathLike
): subcommandobject[] | undefined {
  if (fs.existsSync(folder)) {
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

// export const commandsExport = commands;
// export const menusExport = menus;
// export const buttonsExport = buttons;

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
    commandsExport.forEach((command) => {
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
      //if ((command.MainCommand == true)) {
      commandBuilder.setDescription(command.description);
      //}
      commandBuilder.setDMPermission(command.allowInDMs);
      //if (command.permissions) {
      //const permissions = new PermissionsBitField(command.permissions);
      //commandBuilder.setDefaultMemberPermissions(command.permissions)
      //}
      //commandBuilder.

      let commandJSON = commandBuilder.toJSON();
      commandJSON.default_member_permissions = command.permissions;
      commandJSON.options = options;
      //commandJSON.default_member_permissions = command.permissions

      if (command.testOnly == true) {
        guildCommands.push(commandJSON);
      } else if (command.testOnly == false) {
        globalCommands.push(commandJSON);
      }
    });

    await mongoose.default.connect(mongoUri, {
      keepAlive: true,
    });
    testServers.forEach(async (testServer) => {
      let guild = await client.guilds.fetch(testServer);
      if (!guild) {
        return;
      }
      guild.commands.set(guildCommands);
    });
    client.application?.commands.set(globalCommands);
    console.log("finished registering commands");
    for (const command of commandsExport) {
      if (fs.existsSync(`${command.path}events/`)) {
        const eventFiles = fs
          .readdirSync(`${command.path}events/`)
          .filter((file) => file.endsWith(".ts"));
        for (const file of eventFiles) {
          const event = require(`.${command.path}events/${file}`).default;
          if (event.event) {
            client.on(event.event, (...args) =>
              event.execute(...args, this.client)
            );
          } else {
            event.execute(this.client);
          }
        }
      }
    }
    for (const menu of menusExport) {
      if (fs.existsSync(`${menu.path}events/`)) {
        const eventFiles = fs
          .readdirSync(`${menu.path}events/`)
          .filter((file) => file.endsWith(".ts"));
        for (const file of eventFiles) {
          const event = require(`.${menu.path}events/${file}`).default;
          if (event.event) {
            client.on(event.event, (...args) =>
              event.execute(...args, this.client)
            );
          } else {
            event.execute(this.client);
          }
        }
      }
    }
    const eventFiles = fs
      .readdirSync(`./handler/events`)
      .filter((file) => file.endsWith(".ts"));
    for (const file of eventFiles) {
      const event = require(`./events/${file}`).default;
      if (event.event) {
        client.on(event.event, (...args) =>
          event.execute(...args, this.client)
        );
      } else {
        event.execute(this.client);
      }
    }
    if (fs.existsSync(`./events`)) {
      const eventFiles2 = fs
        .readdirSync(`./events`)
        .filter((file) => file.endsWith(".ts"));
      for (const file of eventFiles2) {
        const event = require(`../events/${file}`).default;
        if (event.event) {
          client.on(event.event, (...args) =>
            event.execute(...args, this.client)
          );
        } else {
          event.execute(this.client);
        }
      }
    }
  }
}

export class UkMessageBuilder {
  async build(
    options: {
      client: Client;
      waitingForResponse: boolean;
      guildId?: string;
      channelId: string;
      userIds: string[];
      Indms: boolean;
      data?: any;
    },
    options2: {
      content?: string;
      embeds?: EmbedBuilder[];
      rows?: Array<String[]>;
    }
  ): Promise<returnMenu> {
    let time = Date.now();
    let menu: returnMenu = {};
    menu.content = options2.content;
    menu.embeds = options2.embeds;
    console.log(`got to messagebuilder point 1:${Date.now() - time}`);
    time = Date.now();
    if (options2.rows) {
      console.log(`got to messagebuilder point 2:${Date.now() - time}`);
      time = Date.now();
      for (const buttons of options2.rows) {
        const row = new ActionRowBuilder();
        //console.log(buttons)
        for (const buttonName of buttons) {
          //console.log(buttonsExport)
          console.log(`got to messagebuilder point 3:${Date.now() - time}`);
          time = Date.now();
          let buttonobject = buttonsExport.find(
            (button) => button.name == buttonName
          );
          console.log(`got to messagebuilder point 4:${Date.now() - time}`);
          time = Date.now();
          if (!buttonobject) {
            throw console.error(`button "${buttonName}" not found`);
          }
          console.log(`got to messagebuilder point 5:${Date.now() - time}`);
          time = Date.now();
          let button = await buttonobject?.create(options);
          console.log(`got to messagebuilder point 6:${Date.now() - time}`);
          time = Date.now();
          if (button) {
            button.setCustomId(buttonName);
            row.addComponents(button);
          }
        }
        if (row.components.length > 0) {
          if (menu.components) {
            menu.components?.push(row);
          } else {
            menu.components = [row];
          }
        }
      }
    }
    console.log(`got to messagebuilder point 7:${Date.now() - time}`);
    time = Date.now();

    return menu;
  }
}
