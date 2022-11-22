import {
  Client,
  ActionRowBuilder,
  Guild,
  SelectMenuBuilder,
  VoiceChannel,
} from "discord.js";
import mongoose from "mongoose";

export async function Select_Generator(
  guild: Guild | null,
  customId: string,
  minValue: number,
  maxValue: number,
  client: Client
) {
  const generators = await mongoose.connection.db
    .collection("generators")
    .find({ guildId: guild!.id });
  const row = new ActionRowBuilder<SelectMenuBuilder>();
  const selectMenu = new SelectMenuBuilder()
    .setCustomId(customId)
    .setMaxValues(maxValue)
    .setMinValues(minValue)
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
}
