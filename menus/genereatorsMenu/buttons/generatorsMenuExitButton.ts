import {
    ButtonBuilder,
    ButtonInteraction,
    ButtonStyle,
    Client,
    MessageActionRowComponentBuilder,
  } from "discord.js";
  import { button } from "../../../handler/typings";
  import { Model } from "mongoose";
  import { Menus } from "../../../handler/setup";
  
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
      userIds?: String[],
      Indms?: Boolean,
      data?: any
    ): Promise<MessageActionRowComponentBuilder> => {
      const button = new ButtonBuilder();
      button.setLabel("Exit");
      button.setStyle(ButtonStyle.Secondary);
      return button;
    },
  } as button;
  