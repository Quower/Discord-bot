import { ChatInputCommandInteraction, Client, EmbedBuilder } from "discord.js";
import { menu } from "../../handler/typings";

export default {
  create: async (
    client: Client,
    interaction: ChatInputCommandInteraction,
    Save: boolean
  ) => {
    const embed = new EmbedBuilder();
    embed.setTitle("Delete Vc generator!");
    embed.setDescription("interesting information about deleteing vc generator");
    
  },
} as menu;
