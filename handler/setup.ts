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
  readyEvent
} from "./typings";
import menu from "../menus/deleteVcGeneratorConfirm/menu";
import { ExitStatus } from "typescript";

const commandfolders = fs.readdirSync("./commanddirs");
let commands = new Array<commandobject>();
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
      options: object.default.options || undefined,
      allowInDMs: object.default.allowInDMs || false,
      ownerOnly: object.default.ownerOnly || false,
      testOnly: object.default.testOnly || false,
      permissions: object.default.permissions || undefined,
      ManinCommand: object.default.ManinCommand || true,
    } as commandobject;

    commands.push(subcommand);
  } else {
    const name = folder;
    const path = `./commanddirs/${folder}/`;
    const object = require(`.${path}main.ts`);
    const subcommands = Setup_Subcommands(`${path}subcommands/`);
    const subcommand = {
      command: name,
      description: object.default.description,
      path: path,
      subcommands: subcommands || [],
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
  }
});

const menufolders = fs.readdirSync("./menus");
let menus = new Array<menuobject>();
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

    menus.push(menu);
  }
});

let buttons: buttonArray = new Array();
menus.forEach((menu) => {
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
        callback: function (
          client: Client,
          interaction: ButtonInteraction | SelectMenuInteraction,
          data: any
        ) {
          object.default.callback(client, interaction, data);
        },
        create: function (
          client: Client,
          guildId?: String,
          channelId?: String,
          userId?: String,
          Indms?: Boolean
        ): Promise<AnyComponentBuilder> {
          return object.default.create(
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
  }
});

export function Setup_Subcommands(
  folder: fs.PathLike
): subcommandArray | undefined {
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
      if (fs.existsSync(`.${command.path}events/`)) {
        const eventFiles = fs
          .readdirSync(`.${command.path}events/`)
          .filter((file) => file.endsWith(".ts"));
        for (const file of eventFiles) {
          const event = require(`.${command.path}events/${file}`).default;
          if (event.event) {
            client.on(event.event, (...args) =>
              event.execute(...args, this.client)
            );
          } else {
            event.execute(this.client)
          }
        }
      }
    }
    for (const menu of menusExport) {
      if (fs.existsSync(`.${menu.path}events/`)) {
        const eventFiles = fs
          .readdirSync(`.${menu.path}events/`)
          .filter((file) => file.endsWith(".ts"));
        for (const file of eventFiles) {
          const event = require(`.${menu.path}events/${file}`).default;
          if (event.event) {
            client.on(event.event, (...args) =>
              event.execute(...args, this.client)
            );
          } else {
            event.execute(this.client)
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
        event.execute(this.client)
      }
    }
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
        event.execute(this.client)
      }
    }
  }
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
    let time = Date.now();
    let menu: returnMenu = {};
    menu.content = options.content;
    menu.embeds = options.embeds;
    console.log(`got to messagebuilder point 1:${Date.now() - time}`);
    time = Date.now();
    if (options.rows) {
      console.log(`got to messagebuilder point 2:${Date.now() - time}`);
      time = Date.now();
      for (const buttons of options.rows) {
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
          let button = await buttonobject?.create(
            options.client,
            options.guildId,
            options.channelId,
            options.userIds,
            options.Indms,
            options.data
          );
          console.log(`got to messagebuilder point 6:${Date.now() - time}`);
          time = Date.now();
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
    console.log(`got to messagebuilder point 7:${Date.now() - time}`);
    time = Date.now();

    return menu;
  }
}
