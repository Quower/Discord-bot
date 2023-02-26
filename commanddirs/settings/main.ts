import { PermissionsBitField } from "discord.js";
import { command } from "../../handler/typings";

export default {
  description: "command",
  allowInDMs: false,
  ownerOnly: false,
  testOnly: false,
  permissions: PermissionsBitField.Flags.Administrator,
  MainCommand: false,
  callback: async (client, interaction) => {
    interaction.reply("test");
  },
} as command;
