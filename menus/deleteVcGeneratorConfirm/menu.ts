import { ChatInputCommandInteraction, Client, EmbedBuilder } from "discord.js";
import Handler, { UkMessageBuilder } from "../../handler/setup";
import { menu, returnMenu } from "../../handler/typings";

export default {
  create: async (
    client: Client,
    interaction: ChatInputCommandInteraction,
  ):Promise<returnMenu> => {
    const embed = new EmbedBuilder();
    embed.setTitle("Delete Vc generator!");
    embed.setDescription("interesting information about deleteing vc generator");

    let menu = await new UkMessageBuilder({
      content: 'weed',
      rows: [['deleteVcGeneratorConfirmbutton']],
      embeds: [embed]

    })
    return menu
    
  },
} as menu;
