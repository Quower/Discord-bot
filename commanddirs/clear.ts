import {
  PermissionsBitField,
  ApplicationCommandOptionType,
  TextChannel,
} from "discord.js";
import { command } from "../handler/typings";

export default {
  description: "command",
  allowInDMs: false,
  ownerOnly: false,
  testOnly: false,
  permissions: PermissionsBitField.Flags.Administrator,
  MainCommand: true,
  options: [
    {
      name: "number",
      description: "Number of messages to delete",
      required: true,
      type: ApplicationCommandOptionType.Integer,
      maxValue: 100,
      minValue: 2,
    },
  ],
  callback: async (client, interaction) => {
    let channel = interaction.channel;
    let number = interaction.options.getInteger("number");

    if (channel instanceof TextChannel) {
      if (number)
        await channel.bulkDelete(number, true).then((deletedMessages) => {
          interaction.reply({
            content: `Deleted ${deletedMessages.size} messages.`,
            ephemeral: true,
          });
        });
      setTimeout(() => {
        interaction.deleteReply();
      }, 2000);
    }
  },
} as command;
