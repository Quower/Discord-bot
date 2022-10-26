import {
  BaseGuildTextChannel,
  BaseGuildVoiceChannel,
  Channel,
  Client,
  GuildChannel,
  MessageEmbed,
  RoleManager,
  MessageActionRow,
  Guild,
  SelectMenuInteraction,
  MessageSelectMenu,
} from "discord.js";
import mongoose from "mongoose";
import { client } from "..";

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
  const row = new MessageActionRow();
  const selectMenu = new MessageSelectMenu()
    .setCustomId(customId)
    .setMaxValues(maxValue)
    .setMinValues(minValue)
    .setPlaceholder("Nothing Selected");
  await generators.forEach((generator) => {
    selectMenu.addOptions([
      {
        label: `<#${generator.channelId}>`,
        description: "idk what to put in description",
        value: generator.channelId,
        emoji: `1034894487236902942`,
      },
    ]);
  });
  row.addComponents(selectMenu);
  return row;
}
