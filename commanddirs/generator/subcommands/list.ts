import { Client, EmbedBuilder, CommandInteraction } from "discord.js";
import { subcommand } from "../../../handler/typings";
import generatorSchema from "../models/generatorSchema";

export default {
  description: "lis all vc generators",
  callback: async (client: Client, interaction: CommandInteraction) => {
    if (client == undefined && interaction == undefined) {
      return;
    }
    let channels = "**list of all vc generators:**";
    await (
      await generatorSchema.find({ guildId: interaction.guild!.id })
    ).forEach((generator) => {
      channels = `${channels}\n• <#${generator.channelId}>`;
    });

    const embed = new EmbedBuilder();
    embed.setTitle("Generators");
    if (channels.length == 0) {
      channels = "None";
    }
    embed.setDescription(channels);
    interaction.reply({
      embeds: [embed],
      ephemeral: true,
    });
  },
} as subcommand;
