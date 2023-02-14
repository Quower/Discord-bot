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
    switch (options.data.settingType) {
      case "string":
        if (options.data.validValues) {
          const stringSelect = new SelectMenuBuilder();
          stringSelect.setPlaceholder("select string");
          stringSelect.setMaxValues(0);
          options.data.validValues.forEach(async (validValue: any) => {
            stringSelect.addOptions([
              {
                label: validValue,
                value: validValue,
                default: options.data.settingValue.includes("validValue"),
              },
            ]);
          });
          return stringSelect;
        } else {
          const stringInput = new ButtonBuilder({
            type: ComponentType.TextInput,
            style: 1 /*short*/,
          });
          stringInput.setLabel("input string");

          // if (options.data.waitingForResponse) {
          //   stringButton.setStyle(ButtonStyle.Primary);
          //   stringButton.setLabel("Input");
          // } else {
          //   stringButton.setStyle(ButtonStyle.Danger);
          //   stringButton.setLabel("Cancel Input");
          // }
          return stringInput;
        }
      case "boolean":
        if (options.data.settingValue) {
          return new SelectMenuBuilder().setOptions([
            {
              label: "true",
              value: "true",
              default: true,
            },
            {
              label: "false",
              value: "false",
              default: false,
            },
          ]);
        } else {
          return new SelectMenuBuilder().setOptions([
            {
              label: "true",
              value: "true",
              default: false,
            },
            {
              label: "false",
              value: "false",
              default: true,
            },
          ]);
        }

      case "channel":
        const channelSelect = new SelectMenuBuilder({
          channel_types: [ChannelType.GuildText, ChannelType.GuildVoice],
        });
        channelSelect.setPlaceholder("select channel");
        channelSelect.setMaxValues(0);
        channelSelect.setMaxValues(1);

        return channelSelect;
      case "channels":
        const channelsSelect = new SelectMenuBuilder({
          channel_types: [ChannelType.GuildText, ChannelType.GuildVoice],
        });
        channelsSelect.setPlaceholder("select channels");
        channelsSelect.setMaxValues(0);
        channelsSelect.setMaxValues(25);

        return channelsSelect;
      case "textChannel":
        const textchannelSelect = new SelectMenuBuilder({
          channel_types: [ChannelType.GuildText, ChannelType.GuildVoice],
        });
        textchannelSelect.setPlaceholder("select text channel");
        textchannelSelect.setMaxValues(0);
        textchannelSelect.setMaxValues(1);

        return textchannelSelect;
      case "textChannels":
        const textchannelsSelect = new SelectMenuBuilder({
          channel_types: [ChannelType.GuildText, ChannelType.GuildVoice],
        });
        textchannelsSelect.setPlaceholder("select text channels");
        textchannelsSelect.setMaxValues(0);
        textchannelsSelect.setMaxValues(25);

        return textchannelsSelect;
      case "voiceChannel":
        const voicechannelSelect = new SelectMenuBuilder({
          channel_types: [ChannelType.GuildText, ChannelType.GuildVoice],
        });
        voicechannelSelect.setPlaceholder("select voice channel");
        voicechannelSelect.setMaxValues(0);
        voicechannelSelect.setMaxValues(1);

        return voicechannelSelect;
      case "voiceChannels":
        const voicechannelsSelect = new SelectMenuBuilder({
          channel_types: [ChannelType.GuildText, ChannelType.GuildVoice],
        });
        voicechannelsSelect.setPlaceholder("select voice channels");
        voicechannelsSelect.setMaxValues(0);
        voicechannelsSelect.setMaxValues(25);

        return voicechannelsSelect;
      case "member":
        const memberSelect = new SelectMenuBuilder({
          type: ComponentType.UserSelect,
        });
        memberSelect.setPlaceholder("select member");
        memberSelect.setMaxValues(0);
        memberSelect.setMaxValues(1);

        return memberSelect;
      case "members":
        const membersSelect = new SelectMenuBuilder({
          type: ComponentType.MentionableSelect,
        });
        membersSelect.setPlaceholder("select members");
        membersSelect.setMaxValues(0);
        membersSelect.setMaxValues(25);

        return membersSelect;
      case "role":
        console.log('at role')
        const roleSelect = new SelectMenuBuilder({
          type: ComponentType.RoleSelect,
        });
        roleSelect.setPlaceholder("select role");
        roleSelect.setMaxValues(0);
        roleSelect.setMaxValues(1);

        return roleSelect;
      case "roles":
        const rolesSelect = new SelectMenuBuilder({
          type: ComponentType.RoleSelect,
        });
        rolesSelect.setPlaceholder("select roles");
        rolesSelect.setMaxValues(0);
        rolesSelect.setMaxValues(25);

        return rolesSelect;
      case "perms":
        const permSelect = new SelectMenuBuilder({
          type: ComponentType.MentionableSelect,
        });
        permSelect.setPlaceholder("select roles and members");
        permSelect.setMaxValues(0);
        permSelect.setMaxValues(25);
    }
    const button = new ButtonBuilder();
    button
      .setDisabled(true)
      .setLabel("something went wrong")
      .setStyle(ButtonStyle.Secondary);
    return button;
  },
} as button;
