import { ActionRowBuilder, ChatInputCommandInteraction, Client, EmbedBuilder, SelectMenuBuilder, VoiceChannel } from "discord.js";
import generatorSchema from "../../../commanddirs/generator/models/generatorSchema";
import { selectMenu } from "../../../handler/typings";

export default {
  callback: async (
    client: Client,
    interaction: ChatInputCommandInteraction
  ) => {
    //code
  },
  create: async (
    client: Client,
    interaction: ChatInputCommandInteraction
  ) => {
    const generators = await generatorSchema.find({ guildId: interaction.guild!.id });
    const row = new ActionRowBuilder<SelectMenuBuilder>();
    const selectMenu = new SelectMenuBuilder()
      .setMaxValues(1)
      .setMinValues(1)
      .setPlaceholder("Nothing Selected");
    await generators.forEach((generator) => {
      const channel = client.channels.cache.get(generator.channelId);
      if (channel instanceof VoiceChannel) {
        selectMenu.addOptions([
          {
            label: `${channel.name}`,
            description: `${channel.position}`,
            value: generator.channelId,
            emoji: `1034894487236902942`,
          },
        ]);
      } else {
        selectMenu.addOptions([
          {
            label: `${"#deleted-channel"}`,
            description: `${"stuff"}`,
            value: generator.channelId,
            emoji: `1034894487236902942`,
          },
        ]);
      }
    });
    row.addComponents(selectMenu);
    return row;
  },
} as selectMenu;
