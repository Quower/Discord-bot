import { Client, EmbedBuilder, CommandInteraction } from "discord.js";
import mongoose from "mongoose";
import { subcommand } from "../../../handler/models/subcommand";

export default {
  description: "",
  options: [],
  callback: async (client: Client, interaction: CommandInteraction) => {
    if (client == undefined && interaction == undefined) {
      return;
    }
    let channels = "";
    await mongoose.connection.db
      .collection("generators")
      .find({ guildId: interaction.guild!.id })
      .forEach((generator) => {
        channels = `${channels}• <#${generator.channelId}>\n`;
      });

    const embed = new EmbedBuilder();
    embed.setTitle("Generators");
    if (channels.length == 0) {
      channels = "None";
    }
    embed.setDescription(channels);
    interaction.editReply({
      embeds: [embed],
    });
  },
} as subcommand;
