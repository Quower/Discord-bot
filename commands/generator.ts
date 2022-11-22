import {
  Client, Guild, CommandInteraction,
} from "discord.js";
import WOK, { Command, CommandObject, CommandType } from "wokcommands";
import fs from "fs";
import { Path } from "typescript";
import { Setup_Subcommands } from "../functions/commands/setup_subcommands"
let subcommands = Setup_Subcommands("./subcommands/generator/")


/*export default {
  category: "testing commands",
  description: "command for testing",
  slash: true,
  guildOnly: true,
  ownerOnly: true,
  testOnly: true, //remove before merging to mater brach
  permissions: ["ADMINISTRATOR"],
  options: [
    {
      name: "create",
      type: "SUB_COMMAND",
      description: "create a vc generator",
      options: [
        {
          name: "name",
          description: "name for the generated vc",
          type: "STRING",
          required: true,
        },
      ],
    },
    {
      name: "delete",
      type: "SUB_COMMAND",
      description: "delete a vc generator",
    },
    {
      name: "list",
      type: "SUB_COMMAND",
      description: "list all vc generators",
    },
  ],
  init: async (client: Client) => {},

  callback: async ({ client: Client, guild, interaction }) => {
    const options = interaction.options;
    await interaction.deferReply({
      ephemeral: true,
    });

    const subcommand = options.getSubcommand();

    let func = (await subcommands).find(subcomman => subcomman.command == subcommand)?.callback
    if (func) {
      (await subcommands).find(subcomman => subcomman.command == subcommand)?.callback(client, interaction)
    }


  },
} as CommandObject;*/
export default {
  description: "vc generator command",
  slash: true,
  guildOnly: true,
  ownerOnly: true,
  testOnly: true, //remove before merging to mater brach
  permissions: ["ADMINISTRATOR"],
  options: [
    {
      name: "create",
      type: "SUB_COMMAND",
      description: "create a vc generator",
      options: [
        {
          name: "name",
          description: "name for the generated vc",
          type: "STRING",
          required: true,
        },
      ],
    },
    {
      name: "delete",
      type: "SUB_COMMAND",
      description: "delete a vc generator",
    },
    {
      name: "list",
      type: "SUB_COMMAND",
      description: "list all vc generators",
    },
  ],
  callback: ({
        client: Client,
        interaction: CommandInteraction,
        updateCooldown: (expires: Date) => {},
      }) => {
    const options = interaction.options;
    await interaction.deferReply({
      ephemeral: true,
    });

    const subcommand = options.getSubcommand();

    let func = (await subcommands).find(subcomman => subcomman.command == subcommand)?.callback
    if (func) {
      (await subcommands).find(subcomman => subcomman.command == subcommand)?.callback(client, interaction)
    }

  },
  
} as Command;
