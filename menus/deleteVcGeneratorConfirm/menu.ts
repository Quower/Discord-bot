import { ChatInputCommandInteraction, Client, EmbedBuilder } from "discord.js";
import Handler, { UkMessageBuilder } from "../../handler/setup";
import { menu, returnMenu } from "../../handler/typings";

export default {
  create: async (
    options: {
      client: Client;
      waitingForResponse: boolean;
      guildId?: String;
      channelId?: String;
      userId?: String;
      Indms?: Boolean;
    }
  ):Promise<returnMenu> => {
    const embed = new EmbedBuilder();
    embed.setTitle("Delete Vc generator!");
    embed.setDescription("interesting information about deleteing vc generator");

    let menu = await new UkMessageBuilder({
      content: 'weed',
      rows: [['deleteVcGeneratorConfirmbutton']],
      embeds: [embed],
      client: options.client,
      guildId: options.guildId,
      channelId: options.channelId,
      userId: options.userId,
      Indms: options.Indms

    })
    return menu
    
  },
} as menu;