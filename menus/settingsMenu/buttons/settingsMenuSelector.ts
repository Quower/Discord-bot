import {
  ButtonBuilder,
  ButtonStyle,
  Client,
  MessageActionRowComponentBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuInteraction,
} from "discord.js";
import { Menus } from "../../../handler/menuhandlre";
import { button } from "../../../handler/typings";

export default {
  callback: async (options) => {
    if (options.interaction instanceof StringSelectMenuInteraction) {
      options.interaction.deferUpdate();
      Menus.update({
        messageId: options.interaction.message.id,
        client: options.client,
        menu: "settingsCategoryMenu",
        data: { page: 1, category: options.interaction.values[0] },
      });
    }
  },
  create: async (options): Promise<MessageActionRowComponentBuilder> => {
    const selectMenu = new StringSelectMenuBuilder()
      .setMaxValues(1)
      .setMinValues(1)
      .setPlaceholder("Nothing Selected");
    // if(generators.length == 0) {selectMenu.setDisabled()
    // selectMenu.setPlaceholder("This guild doesn't have any generators")
    // return selectMenu}
    if (options.data.categorydata.length < 1) {
      const button = new ButtonBuilder();
      button
        .setDisabled(true)
        .setLabel("something went wrong")
        .setStyle(ButtonStyle.Secondary);
      return button;
    }
    options.data.categorydata.forEach((category: any) => {
      selectMenu.addOptions([
        {
          label: category.display,
          value: category.name,
          description: category.description,
        },
      ]);
    });

    return selectMenu;
  },
} as button;
