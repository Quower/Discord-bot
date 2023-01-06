import { AnyComponentBuilder, ButtonBuilder, ButtonInteraction, ButtonStyle, ChatInputCommandInteraction, Client, MessageActionRowComponentBuilder } from "discord.js";
import { Model } from "mongoose";
import { button } from "../../../handler/typings";

export default {
  callback: async (
    client: Client,
    interaction: ButtonInteraction,
    model: Model<any>
  ) => {
    //code
  },
  create: async (
    client: Client,
    guildId?: String,
    channelId?: String,
    userId?: String,
    Indms?: Boolean,
    data?: any
  ):Promise<MessageActionRowComponentBuilder> => {
    const button = new ButtonBuilder()
    button.setLabel('Confirm')
    button.setStyle(ButtonStyle.Danger)
    return button
  },
} as button;