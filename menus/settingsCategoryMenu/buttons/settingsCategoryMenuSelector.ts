import {
  ButtonBuilder,
  ButtonStyle,
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
        menu: "settingEditMenu",
        data: {
          setting: options.interaction.values[0],
          category: options.data.category,
        },
      });
    }
  },
  create: async (options): Promise<MessageActionRowComponentBuilder> => {
    const selectMenu = new StringSelectMenuBuilder()
      .setMaxValues(1)
      .setMinValues(1)
      .setPlaceholder("Nothing Selected");
    if (options.data.settingdata.length < 1) {
      const button = new ButtonBuilder();
      button
        .setDisabled(true)
        .setLabel("something went wrong")
        .setStyle(ButtonStyle.Secondary);
      return button;
    }
    options.data.settingdata.forEach((setting: any) => {
      selectMenu.addOptions([
        {
          label: setting.display,
          value: setting.name,
          description: setting.description,
        },
      ]);
    });

    return selectMenu;
  },
} as button;
