import {
  Client,
  ChatInputCommandInteraction,
  PermissionsBitField,
} from "discord.js";
import { command } from "../../handler/typings";
// const deleteVcGeneratorSelectorCancelbutton = require('../menus/deleteVcGeneratorSelector/buttons/deleteVcGeneratorSelectorSelectMenu.ts')

export default {
  description: "command",
  allowInDMs: false,
  ownerOnly: true,
  testOnly: true,
  permissions: PermissionsBitField.Flags.Administrator,
  MainCommand: false,
  callback: async (
    client,
    interaction
  ) => {},
} as command;
