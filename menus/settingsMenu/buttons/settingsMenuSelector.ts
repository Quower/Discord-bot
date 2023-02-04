import {
  ActionRowBuilder,
  AnyComponentBuilder,
  ButtonBuilder,
  ButtonInteraction,
  ButtonStyle,
  ChatInputCommandInteraction,
  Client,
  EmbedBuilder,
  MessageActionRowComponentBuilder,
  SelectMenuBuilder,
  SelectMenuInteraction,
  VoiceChannel,
} from "discord.js";
import { Model } from "mongoose";
import generatorSchema from "../../../commanddirs/generators/models/generatorSchema";
import { Menus } from "../../../handler/menuhandlre";
import { button } from "../../../handler/typings";

export default {
  callback: async (options: {
    client: Client;
    interaction: SelectMenuInteraction;
    data?: any;
  }) => {
    options.interaction.deferUpdate();
    Menus.update({
      messageId: options.interaction.message.id,
      client: options.client,
      menu: "settingsCategoryMenu",
      data: {page: 1, category: options.interaction.values[0]},
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
    const selectMenu = new SelectMenuBuilder()
      .setMaxValues(1)
      .setMinValues(1)
      .setPlaceholder("Nothing Selected");
    // if(generators.length == 0) {selectMenu.setDisabled()
    // selectMenu.setPlaceholder("This guild doesn't have any generators")
    // return selectMenu}
    options.data.categorydata.forEach((category: any) => {
      selectMenu.addOptions([{
        label: category.display,
        value: category.name,
        description: category.description
      }])
    });
    if (options.data.categorydata < 1) {
      const button = new ButtonBuilder();
      button
        .setDisabled(true)
        .setLabel("something went wrong")
        .setStyle(ButtonStyle.Secondary);
      return button;
    }

    return selectMenu;
  },
} as button;
