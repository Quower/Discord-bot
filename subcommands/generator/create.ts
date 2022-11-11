import { Client, CommandInteraction, Options } from "discord.js";
import { subcommand } from "../../models/subcommand";
import generatorSchema from "../../mongodb/generator";

export default {
  description: "",
  options: [],
  callback: (client: Client, interaction: CommandInteraction) => {
    if (client == undefined && interaction == undefined) {return}
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
  },
} as subcommand;
