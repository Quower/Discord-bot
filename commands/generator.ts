import {
  Client,
} from "discord.js";
import { ICommand } from "wokcommands";
import fs from "fs";
const subcommandfiles = fs
  .readdirSync("./subcommands/generator")
  .filter((file) => file.endsWith(".ts"));
const subcommands = subcommandfiles.map((x) => {
  return x.replace(".ts", "");
});

export default {
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

  callback: async ({ client, guild, interaction }) => {
    const options = interaction.options;
    await interaction.deferReply({
      ephemeral: true,
    });

    const subcommand = options.getSubcommand();

    if (subcommands.includes(subcommand)) {
      require(`../subcommands/generator/${subcommand}`).run(guild, interaction);
    }
  },
} as ICommand;
