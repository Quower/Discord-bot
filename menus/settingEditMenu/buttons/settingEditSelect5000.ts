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
  } from "discord.js";
  import { Model } from "mongoose";
  import generatorSchema from "../../../commanddirs/generators/models/generatorSchema";
  import SettingsHandler from "../../../commanddirs/settings/funtions";
  import { Menus } from "../../../handler/menuhandlre";
  import { button } from "../../../handler/typings";
  
  export default {
    callback: async (options: {
      client: Client;
      interaction: SelectMenuInteraction;
      data?: any;
      waitingForResponse: boolean;
    }) => {
      options.interaction.deferUpdate();
      // Menus.update({
      //   messageId: options.interaction.message.id,
      //   client: options.client,
      //   data: {
      //     setting: options.interaction.values[0],
      //     category: options.data.category,
      //   },
      // });
    },
    create: async (options: {
      client: Client;
      guildId?: string;
      channelId: string;
      userIds: string[];
      Indms: boolean;
      data?: any;
    }): Promise<MessageActionRowComponentBuilder> => {
      console.log(options.data)
      //discordjs.perm
      
      const button = new ButtonBuilder();
      button
        .setDisabled(true)
        .setLabel("something went wrong")
        .setStyle(ButtonStyle.Secondary);
      return button;
    },
  } as button;
  