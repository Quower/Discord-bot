import { Client, MessageEmbed, CommandInteraction } from "discord.js";
import mongoose from "mongoose";

exports.run = async (client: Client, interaction: CommandInteraction) => {
  let channels = "";
  await mongoose.connection.db
    .collection("generators")
    .find({ guildId: interaction.guild!.id })
    .forEach((generator) => {
      channels = `${channels}• <#${generator.channelId}>\n`;
    });

  const embed = new MessageEmbed();
  embed.title = "Generators";
  if (channels.length == 0) {
    channels = "None";
  }
  embed.description = channels;
  interaction.editReply({
    embeds: [embed],
  });
};
