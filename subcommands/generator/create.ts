import { Client, CommandInteraction } from "discord.js";
import generatorSchema from "../../mongodb/generator";

exports.run = (client: Client, interaction: CommandInteraction) => {
  interaction.guild?.channels
    .create(interaction.options.getString("name") || "name not inputed", {
      type: "GUILD_VOICE",
    })
    .then(async (channel) => {
      await new generatorSchema({
        channelId: channel.id,
        guildId: channel.guildId,
      }).save();
      interaction.editReply({
        content: `created a vc generator: <#${channel.id}>`,
      });
    });
};
