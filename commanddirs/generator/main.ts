import {
  Client,
  ChatInputCommandInteraction,
  ApplicationCommandOptionType,
  ApplicationCommandOption,
} from "discord.js";
import WOK, { Command, CommandObject, CommandType } from "wokcommands";
import fs from "fs";
import { Path } from "typescript";
import { command } from "../../handler/models/command";

export default {
  description: "command",
  guildOnly: true,
  ownerOnly: true,
  testOnly: true,
  permissions: ["ADMINISTRATOR"],
  noManinCommand: true,
  options: [
    {
      name: "create",
      type: ApplicationCommandOptionType.Subcommand,
      description: "create a vc generator",
      options: [
        {
          name: "name",
          description: "name for the generated vc",
          type: ApplicationCommandOptionType.String,
          required: true,
        },
      ],
    },
    {
      name: "delete",
      type: ApplicationCommandOptionType.Subcommand,
      description: "delete a vc generator",
    },
    {
      name: "list",
      type: ApplicationCommandOptionType.Subcommand,
      description: "list all vc generators",
    },
  ],
  callback: async (
    client: Client,
    interaction: ChatInputCommandInteraction
  ) => {},
} as command;

let test: ApplicationCommandOption = 
  {
    name: "create",
    type: ApplicationCommandOptionType.Subcommand,
    description: "create a vc generator",
    options: [
      {
        name: "name",
        description: "name for the generated vc",
        type: ApplicationCommandOptionType.String,
        required: true,
      },
    ],
  }
test.name = ``