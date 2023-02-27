import {
  ButtonBuilder,
  ButtonInteraction,
  ButtonStyle,
  Client,
  MessageActionRowComponentBuilder,
} from "discord.js";
import { button } from "../../../handler/typings";
import { Menus } from "../../../handler/menuhandlre";

export default {
  callback: async (options) => {
    options.interaction.deferUpdate();
    Menus.update({
      messageId: options.interaction.message.id,
      client: options.client,
      menu: "deleteVcGeneratorSelector",
    });
  },
  create: async (options): Promise<MessageActionRowComponentBuilder> => {
    const button = new ButtonBuilder();
    button.setLabel("Delete Generator");
    button.setStyle(ButtonStyle.Secondary);
    return button;
  },
} as button;