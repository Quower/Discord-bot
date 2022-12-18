import {
  AnyComponentBuilder,
  ButtonBuilder,
  ButtonInteraction,
  ButtonStyle,
  ChatInputCommandInteraction,
  Client,
} from "discord.js";
import { button } from "../../../handler/typings";
import menuSchema from "../../../handler/models/menuSchema";
import { Model } from "mongoose";

export default {
  callback: async (
    client: Client,
    interaction: ButtonInteraction,
    model: Model<any>
  ) => {
    //code
  },
  create: async (): Promise<AnyComponentBuilder> => {
    const button = new ButtonBuilder();
    button.setLabel("Cancel");
    button.setStyle(ButtonStyle.Secondary);
    return button;
  },
} as button;
