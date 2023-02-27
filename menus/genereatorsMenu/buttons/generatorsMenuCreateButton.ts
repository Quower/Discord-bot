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
      menu: "createVcGeneratorMenu",
    });
  },
  create: async (options: {
    client: Client;
    guildId?: String;
    channelId: String;
    userIds: String[];
    Indms: Boolean;
    data?: any;
    waitingForResponse: boolean;
  }): Promise<MessageActionRowComponentBuilder> => {
    const button = new ButtonBuilder();
    button.setLabel("Create Generator");
    button.setStyle(ButtonStyle.Secondary);
    button.setDisabled(true);
    return button;
  },
} as button;