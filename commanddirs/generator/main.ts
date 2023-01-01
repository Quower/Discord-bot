import {
  Client,
  ChatInputCommandInteraction,
  PermissionsBitField,
} from "discord.js";
import { command } from "../../handler/typings";

export default {
  description: "command",
  allowInDMs: false,
  ownerOnly: true,
  testOnly: true,
  permissions: [PermissionsBitField.Flags.Administrator],
  MainCommand: false,
  callback: async (
    client: Client,
    interaction: ChatInputCommandInteraction
  ) => {},
} as command;