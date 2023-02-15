import {
  ApplicationCommandOptionType,
  ChannelType,
  ChatInputCommandInteraction,
  Client,
} from "discord.js";
import { subcommand } from "../../../handler/typings";
import generatorSchema from "../models/generatorSchema";

export default {
  description: "create a vc generator",
  options: [
    {
      name: "name",
      description: "name for the generated vc",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  callback: (client: Client, interaction: ChatInputCommandInteraction) => {
    if (client == undefined && interaction == undefined) {
      return;
    }
    const name = interaction.options.getString("name");
    interaction.guild?.channels
      .create({ name: `${name}`, type: ChannelType.GuildVoice })
      .then(async (channel) => {
        await new generatorSchema({
          channelId: channel.id,
          guildId: channel.guildId,
        }).save();
        interaction.reply({
          content: `created a vc generator: <#${channel.id}>`,
          ephemeral: true,
        });
      });
  },
} as subcommand;
