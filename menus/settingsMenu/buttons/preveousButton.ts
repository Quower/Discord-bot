import {
  ButtonBuilder,
  ButtonStyle,
  MessageActionRowComponentBuilder,
} from "discord.js";
import { button } from "../../../handler/typings";
import { Menus } from "../../../handler/menuhandlre";

export default {
  callback: async (options) => {
    options.interaction.deferUpdate();
    options.data.page = options.data.page - 1;
    console.log(options.data);
    Menus.update({
      messageId: options.interaction.message.id,
      client: options.client,
      data: options.data,
    });
  },
  create: async (options): Promise<MessageActionRowComponentBuilder> => {
    const button = new ButtonBuilder();
    if (options.data.currentPage == 1) {
      button.setLabel("<");
      button.setStyle(ButtonStyle.Primary);
      button.setDisabled(true);
      return button;
    }
    button.setLabel("<");
    button.setStyle(ButtonStyle.Primary);
    return button;
  },
} as button;
