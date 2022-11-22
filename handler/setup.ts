import {
  ApplicationCommandOption,
  ApplicationCommandOptionType,
  Client,
  CommandInteraction,
  Guild,
  SlashCommandBuilder,
} from "discord.js";
import fs from "fs";
import { setOriginalNode } from "typescript";
import { client } from "../index";
import { commandobject } from "./models/command";
import { subcommandobject } from "./models/subcommand";
import { subcommandArray } from "./models/subcommand";

const events = fs
  .readdirSync("./events")
  .filter((file) => file.endsWith(".ts"));
for (const file of events) {
  const eventName = file.split(".")[0];
  const event = require(`./events/${file}`);
  client.on(eventName, event.bind(null, client));
}

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
    guildOnly: object.default.guildOnly || false,
    ownerOnly: object.default.ownerOnly || false,
    testOnly: object.default.testOnly || false,
    permissions: object.default.permissions || null,
    noManinCommand: object.default.noManinCommand || false,
  } as commandobject;

  commands.push(subcommand);
});

export function Setup_Subcommands(folder: fs.PathLike): subcommandArray {
  const subcommandfiles = fs
    .readdirSync(folder)
    .filter((file) => file.endsWith(".ts"));
  let subcommands = new Array();

  subcommandfiles.forEach((file) => {
    const name = file.toString();
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
      guildOnly: object.default.guildOnly || false,
      ownerOnly: object.default.ownerOnly || false,
      testOnly: object.default.testOnly || false,
      permissions: object.default.permissions || null,
    } as subcommandobject;

    subcommands.push(subcommand);
  });

  return subcommands;
}

// export default async function setupHandler(
//   testServers: String[],
//   botOwners: String[],
//   mongoUri: String,
//   client: Client
// ) {}

export default class CommandHandler {
  testServers!: String[];
  client!: Client<boolean>;
  botOwners!: String[];
  mongoUri!: String;
  constructor(options: {
    client: Client;
    mongoUri: String | undefined;
    testServers?: String[] | undefined;
    botOwners?: String[] | undefined;
  }) {
    this.init(options);
  }
  async init(options: {
    client: Client;
    mongoUri?: String;
    testServers?: String[];
    botOwners?: String[];
  }) {
    let { client, mongoUri = "", testServers = [], botOwners = [] } = options;
    this.client = client;
    this.testServers = testServers;
    this.botOwners = botOwners;
    this.mongoUri = mongoUri;

    commands.forEach((command) => {
      let options = command.options;
      command.subcommands.forEach((subcommand) => {
        const option: ApplicationCommandOption = {
          name: `${subcommand.command}`,
          type: ApplicationCommandOptionType.Subcommand,
          description: `${subcommand.description}`,
          options: subcommand.options,
        };
      });
    });
  }
  // setupHandler() {
  //   console.log('test2')
  //   return "Hello, " + this.testServers;
  // }
}
