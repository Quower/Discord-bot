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
    options.interaction.deferUpdate()
    //console.log(`options at inputbutton ${options}`)
    Menus.update({
      messageId: options.interaction.message.id,
      client: options.client,
      data: options.data,
      waitingForResponse: !(options.waitingForResponse)
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
    //console.log(`options at inputbutton create ${JSON.stringify(options)}`)
    if (options.waitingForResponse) {
      return new ButtonBuilder()
        .setLabel("Input On")
        .setStyle(ButtonStyle.Success);
    } else {
      return new ButtonBuilder()
        .setLabel("Input Off")
        .setStyle(ButtonStyle.Secondary);
    }
  },
} as button;
