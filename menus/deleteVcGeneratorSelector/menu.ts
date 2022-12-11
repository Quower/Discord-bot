import { Client, CommandInteraction, EmbedBuilder } from "discord.js";
import { UkMessageBuilder } from "../../handler/setup";
import { menu, returnMenu } from "../../handler/typings";

export default {
  create: async (
    client: Client,
    interaction: CommandInteraction,
  ):Promise<returnMenu> => {
    const embed = new EmbedBuilder();
    embed.setTitle("Delete Vc generator!");
    embed.setDescription("interesting information about deleteing vc generator");

    let menu = await new UkMessageBuilder({
      content: 'weed',
      rows: [['deleteVcGeneratorSelectorSelectMenu'],['deleteVcGeneratorSelectorCancelbutton']],
      embeds: [embed]

    })
    return menu
    
  },
} as menu;
