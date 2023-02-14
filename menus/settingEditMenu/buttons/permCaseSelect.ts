import discordjs, {
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
  TextInputBuilder,
  VoiceChannel,
  APIChannelSelectComponent,
  APISelectMenuComponent,
  ComponentBuilder,
  ChannelType,
  SelectMenuComponent,
  ComponentType,
  PermissionsBitField,
} from "discord.js";
import { Model } from "mongoose";
import generatorSchema from "../../../commanddirs/generators/models/generatorSchema";
import SettingsHandler from "../../../commanddirs/settings/funtions";
import { Menus } from "../../../handler/menuhandlre";
import { button } from "../../../handler/typings";
import { perm } from "../../../commanddirs/settings/typings";

export default {
  callback: async (options: {
    client: Client;
    interaction: SelectMenuInteraction;
    data?: any;
    waitingForResponse: boolean;
  }) => {
    options.interaction.deferUpdate();
    JSON.stringify(options.data)
    console.log(`data: ${JSON.stringify(options.data)}`)
    if (options.interaction.values[0] == "add") {
      const settingsHandler = new SettingsHandler();
      await settingsHandler.init({
        client: options.client,
        guildId: options.interaction.guildId || "",
      });
      const setting = options.data.newValue
      if (setting == undefined) {await settingsHandler.read({
        optionName: options.data.setting,
        retunrAs: "raw",
      });}
      console.log(`setting: ${setting}`)
      setting.push({ permissions: [], members: [], roles: [] });
      options.data.newValue = setting
      options.data.selected = setting.length;
      Menus.update({
        messageId: options.interaction.message.id,
        client: options.client,
        menu: "settingEditMenu",
        data: options.data,
      });
    } else {
      options.data.selected = options.interaction.values[0];
      Menus.update({
        messageId: options.interaction.message.id,
        client: options.client,
        menu: "settingEditMenu",
        data: options.data,
      });
    }
  },
  create: async (options: {
    client: Client;
    guildId?: string;
    channelId: string;
    userIds: string[];
    Indms: boolean;
    data?: any;
  }): Promise<MessageActionRowComponentBuilder> => {
    console.log(options.data);
    let i = 0;
    const selectmenu = new SelectMenuBuilder();
    selectmenu.setPlaceholder("select perm case");
    for (const permGroup of options.data.settingValue) {
      i++;
      selectmenu.addOptions([{ label: `Case ${i}`, value: `${i}` }]);
    }
    selectmenu.addOptions([
      { label: "Add", value: "add", emoji: "987674667420626965" },
    ]);
    return selectmenu;
  },
} as button;
