import {
  ApplicationCommandOptionChannelTypesMixin,
  ChannelType,
  Client,
  CommandInteraction,
  Options,
} from "discord.js";
import { subcommand } from "../../../handler/models/subcommand";
import generatorSchema from "../../../mongodb/generator";

export default {
  description: "create a vc generator",
  options: [],
  guildOnly: true,
  testOnly: true,
  permissions: ["ADMINISTRATOR"],
  callback: (client: Client, interaction: CommandInteraction) => {
    if (client == undefined && interaction == undefined) {
      return;
    }
    const name = interaction.options.get("name");
    interaction.guild?.channels
      .create({ name: `${name}`, type: ChannelType.GuildVoice })
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
