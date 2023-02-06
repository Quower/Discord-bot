import {
  ButtonBuilder,
  ButtonInteraction,
  ButtonStyle,
  Client,
  MessageActionRowComponentBuilder,
} from "discord.js";
import { button } from "../../../handler/typings";
import { Model } from "mongoose";
import { Menus } from "../../../handler/menuhandlre";
import SettingsHandler from "../../../commanddirs/settings/funtions";

export default {
  callback: async (options: {
    client: Client;
    interaction: ButtonInteraction;
    data?: any;
  }) => {
    const settingsHandler = new SettingsHandler();
    await settingsHandler.init({
      client: options.client,
      guildId: options.interaction.guildId || "",
    });
    for (const newvalue of options.data.newValues) {
        await settingsHandler.write({optionName: newvalue.name, value: newvalue.value})
    }
    settingsHandler.update()
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
    button.setLabel("Confirm");
    if (!options.data.newValues) {
      button.setDisabled(true);
    }
    button.setStyle(ButtonStyle.Success);
    return button;
  },
} as button;
