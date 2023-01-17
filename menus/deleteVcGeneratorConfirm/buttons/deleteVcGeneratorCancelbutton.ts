import {
  ButtonBuilder,
  ButtonInteraction,
  ButtonStyle,
  Client,
  MessageActionRowComponentBuilder,
} from "discord.js";
import { Model } from "mongoose";
import { Menus } from "../../../handler/setup";
import { button } from "../../../handler/typings";

export default {
  callback: async (
    client: Client,
    interaction: ButtonInteraction,
    data?: any
  ) => {
    interaction.deferUpdate();
    Menus.update({
      messageId: interaction.message.id,
      client: client,
      menu: "back",
    });
  },
  create: async (
    client: Client,
    guildId?: String,
    channelId?: String,
    userId?: String,
    Indms?: Boolean,
    data?: any
  ): Promise<MessageActionRowComponentBuilder> => {
    const button = new ButtonBuilder();
    button.setLabel("Cancel");
    button.setStyle(ButtonStyle.Secondary);
    return button;
  },
} as button;
