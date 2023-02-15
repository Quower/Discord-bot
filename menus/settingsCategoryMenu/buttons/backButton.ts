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
    callback: async (options: {
      client: Client;
      interaction: ButtonInteraction;
      data?: any;
    }) => {
      options.interaction.deferUpdate();
      Menus.update({
        messageId: options.interaction.message.id,
        client: options.client,
        menu: "back",
      });
    },
    create: async (options: {
      client: Client;
      guildId?: String;
      channelId: String;
      userIds: String[];
      Indms: Boolean;
      data?: any;
    }): Promise<MessageActionRowComponentBuilder> => {
      const button = new ButtonBuilder();
      button.setLabel("Back");
      button.setStyle(ButtonStyle.Secondary);
      return button;
    },
  } as button;
  