import {
  ButtonBuilder,
  ButtonInteraction,
  ButtonStyle,
  Client,
  MessageActionRowComponentBuilder,
} from "discord.js";
import { button } from "../../../handler/typings";
import { Menus } from "../../../handler/menuhandlre";
import SettingsHandler from "../../../handler/settingshandler";

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
    await settingsHandler.write({
      settingName: options.data.setting,
      value: options.data.snewValue,
    });
    await settingsHandler.update();
    options.interaction.deferUpdate();
    await Menus.update({
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
    if (!options.data.newValue) {
      button.setDisabled(true);
    }
    button.setStyle(ButtonStyle.Success);
    return button;
  },
} as button;
