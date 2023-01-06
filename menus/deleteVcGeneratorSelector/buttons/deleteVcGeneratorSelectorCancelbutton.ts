import {
  ActionRowData,
  AnyComponentBuilder,
  APIActionRowComponent,
  APIMessageActionRowComponent,
  ButtonBuilder,
  ButtonInteraction,
  ButtonStyle,
  ChatInputCommandInteraction,
  Client,
  JSONEncodable,
  MessageActionRowComponentBuilder,
  MessageActionRowComponentData,
} from "discord.js";
import { button } from "../../../handler/typings";
import menuSchema from "../../../handler/models/menuSchema";
import { Model } from "mongoose";

export default {
  callback: async (
    client: Client,
    interaction: ButtonInteraction,
    model: Model<any>,
    data?: any
  ) => {
    //code
  },
  create: async (
    client: Client,
    guildId?: String,
    channelId?: String,
    userIds?: String[],
    Indms?: Boolean,
    data?: any): Promise<MessageActionRowComponentBuilder> => {
    const button = new ButtonBuilder();
    button.setLabel("Cancel");
    button.setStyle(ButtonStyle.Secondary);
    return button;
  },
} as button;
