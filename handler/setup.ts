import {
  ActionRowBuilder,
  ApplicationCommandOption,
  ApplicationCommandOptionType,
  ButtonStyle,
  ChatInputCommandInteraction,
  Client,
  CommandInteraction,
  EmbedBuilder,
  RESTPostAPIChatInputApplicationCommandsJSONBody,
  SelectMenuBuilder,
  SlashCommandBuilder,
} from "discord.js";
import fs from "fs";
import mongoose from "mongoose";
import test from "../commands.old/test";
import { client } from "../index";
import {
  commandobject,
  subcommandobject,
  subcommandArray,
  returnMenu,
  menuobject,
  buttonobject,
  selectMenuobject,
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
  const buttons = Setup_Buttons(`${path}buttons/`);
  const selectMenus = Setup_SelectMenus(`${path}selectMenus/`);
  const menu = {
    path: path,
    create: function (
      client: Client,
      interaction: ChatInputCommandInteraction,
      Save: boolean
    ) {
      object.default.create(client, interaction, Save);
    },
    name: name,
    buttons: buttons,
    selectMenus: selectMenus,
  } as menuobject;

  menus.push(menu);
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

export function Setup_Buttons(folder: fs.PathLike): buttonobject[] {
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
}

export function Setup_SelectMenus(folder: fs.PathLike): selectMenuobject[] {
  const subcommandfiles = fs
    .readdirSync(folder)
    .filter((file) => file.endsWith(".ts"));
  let selectMenus: selectMenuobject[] = new Array();

  subcommandfiles.forEach((file) => {
    const name = file.split(".")[0];
    const path = `${folder}${file}`;
    const object = require(`.${path}`);

    const subcommand = {
      name: name,
      path: path,
      callback: function (client: Client, interaction: CommandInteraction) {
        object.default.callback(client, interaction);
      },
      create: function (
        client: Client,
        interaction: CommandInteraction
      ): ActionRowBuilder<SelectMenuBuilder> {
        return object.default.callback(client, interaction);
      },
    } as selectMenuobject;

    selectMenus.push(subcommand);
  });

  return selectMenus;
}

export const commandsExport = commands;
export const menusExport = menus;

export default class CommandHandler {
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
  /*generateMessage(
    client: Client,
    interaction: CommandInteraction,
    Save: boolean,
    content: string,
    embeds: EmbedBuilder[],
    rows: Array<String[]>

  ):returnMenu {
    return 
  }*/
}
