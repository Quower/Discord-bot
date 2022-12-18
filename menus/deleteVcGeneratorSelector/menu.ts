import { Client, CommandInteraction, EmbedBuilder } from "discord.js";
import { UkMessageBuilder } from "../../handler/setup";
import { menu, returnMenu } from "../../handler/typings";
import Handler from "../../handler/setup";

export default {
  create: async (
    client: Client,
    guildId?: String,
    channelId?: String,
    userId?: String,
    Indms?: Boolean
  ):Promise<returnMenu> => {
    const embed = new EmbedBuilder();
    embed.setTitle("Delete Vc generator!");
    embed.setDescription("interesting information about deleteing vc generator");

    let menu = await new UkMessageBuilder({
      content: 'weed',
      rows: [['deleteVcGeneratorSelectorSelectMenu'],['deleteVcGeneratorSelectorCancelbutton']],
      embeds: [embed],
      client: client,
      guildId: guildId,
      channelId: channelId,
      userId: userId,
      Indms: Indms

    })
    return menu
    
  },
} as menu;

