import {
    Client,
    ChatInputCommandInteraction,
    PermissionsBitField,
  } from "discord.js";
  import { command } from "../../handler/typings";
  
  export default {
    description: "music command",
    allowInDMs: false,
    ownerOnly: false,
    testOnly: false,
    permissions: PermissionsBitField.Flags.Administrator,
    MainCommand: false,
    callback: async (
      client: Client,
      interaction: ChatInputCommandInteraction
    ) => {},
  } as command;
  