import { AnyComponentBuilder, ButtonBuilder, ButtonStyle, ChatInputCommandInteraction, Client } from "discord.js";
import { button } from "../../../handler/typings";

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
  ):Promise<AnyComponentBuilder> => {
    const button = new ButtonBuilder()
    button.setLabel('Cancel')
    button.setStyle(ButtonStyle.Secondary)
    return button
  },
} as button;