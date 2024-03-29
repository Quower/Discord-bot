import {
  ButtonBuilder,
  ButtonInteraction,
  ButtonStyle,
  MessageActionRowComponentBuilder,
  ChannelType,
  StringSelectMenuBuilder,
  RoleSelectMenuBuilder,
  UserSelectMenuBuilder,
  ChannelSelectMenuBuilder,
  MentionableSelectMenuBuilder,
} from "discord.js";
import { Menus } from "../../../handler/menuhandlre";
import { CreateModal } from "../../../handler/modalhandelr";
import { button } from "../../../handler/typings";

export default {
  callback: async (options) => {
    console.log(options.data);
    if (options.interaction instanceof ButtonInteraction) {
      switch (options.data.settingType) {
        case "select":
          await CreateModal({
            name: "settingEditMenuStringInput",
            client: options.client,
            deleteAfter: 120,
            interaction: options.interaction,
            data: {
              menu: options.data,
              messageId: options.interaction.message.id,
            },
          });
        case "role": {
        }
      }

    } else {
      options.interaction.deferUpdate();
      switch (options.data.settingType) {
        case "boolean":
          if (options.interaction.values[0] == "1") {
            options.data.snewValue = true;
            options.data.newValue = "true";
            Menus.update({
              messageId: options.interaction.message.id,
              client: options.client,
              data: options.data,
            });
          } else if (options.interaction.values[0] == "0") {
            options.data.snewValue = false;
            options.data.newValue = "false";
            Menus.update({
              messageId: options.interaction.message.id,
              client: options.client,
              data: options.data,
            });
          }

        case "channel":
          options.data.newValue = `<#${options.interaction.values[0]}>`;
          options.data.snewValue = options.interaction.values[0];
          Menus.update({
            messageId: options.interaction.message.id,
            client: options.client,
            data: options.data,
          });
          break;

        case "channels":
          options.data.newValue = [];
          for (const roleId of options.interaction.values) {
            options.data.newValue.push(`<#${roleId}>`);
          }
          options.data.snewValue = options.interaction.values;
          Menus.update({
            messageId: options.interaction.message.id,
            client: options.client,
            data: options.data,
          });
          break;

        case "textChannel":
          options.data.newValue = `<#${options.interaction.values[0]}>`;
          options.data.snewValue = options.interaction.values[0];
          Menus.update({
            messageId: options.interaction.message.id,
            client: options.client,
            data: options.data,
          });
          break;

        case "textChannels":
          options.data.newValue = [];
          for (const roleId of options.interaction.values) {
            options.data.newValue.push(`<#${roleId}>`);
          }
          options.data.snewValue = options.interaction.values;
          Menus.update({
            messageId: options.interaction.message.id,
            client: options.client,
            data: options.data,
          });
          break;

        case "voiceChannel":
          options.data.newValue = `<#${options.interaction.values[0]}>`;
          options.data.snewValue = options.interaction.values[0];
          Menus.update({
            messageId: options.interaction.message.id,
            client: options.client,
            data: options.data,
          });
          break;

        case "voiceChannels":
          options.data.newValue = [];
          for (const roleId of options.interaction.values) {
            options.data.newValue.push(`<#${roleId}>`);
          }
          options.data.snewValue = options.interaction.values;
          Menus.update({
            messageId: options.interaction.message.id,
            client: options.client,
            data: options.data,
          });
          break;

        case "member":
          options.data.newValue = `<@${options.interaction.values[0]}>`;
          options.data.snewValue = options.interaction.values[0];
          Menus.update({
            messageId: options.interaction.message.id,
            client: options.client,
            data: options.data,
          });
          break;

        case "members":
          options.data.newValue = [];
          for (const roleId of options.interaction.values) {
            options.data.newValue.push(`<@${roleId}>`);
          }
          options.data.snewValue = options.interaction.values;
          Menus.update({
            messageId: options.interaction.message.id,
            client: options.client,
            data: options.data,
          });
          break;

        case "role":
          options.data.newValue = `<@&${options.interaction.values[0]}>`;
          options.data.snewValue = options.interaction.values[0];
          Menus.update({
            messageId: options.interaction.message.id,
            client: options.client,
            data: options.data,
          });
          break;

        case "roles":
          options.data.newValue = [];
          for (const roleId of options.interaction.values) {
            options.data.newValue.push(`<@&${roleId}>`);
          }
          options.data.snewValue = options.interaction.values;
          Menus.update({
            messageId: options.interaction.message.id,
            client: options.client,
            data: options.data,
          });
          break;

        case "select":
          options.data.snewValue = options.interaction.values;
          options.data.newValue = options.interaction.values;
          Menus.update({
            messageId: options.interaction.message.id,
            client: options.client,
            data: options.data,
          });
      }
    }
  },
  create: async (options): Promise<MessageActionRowComponentBuilder> => {
    console.log(options.data);
    switch (options.data.settingType) {
      case "string":
        const stringInput = new ButtonBuilder();
        stringInput.setLabel("input string");
        stringInput.setStyle(ButtonStyle.Secondary);
        return stringInput;
      case "boolean":
        if (options.data.settingValue) {
          return new StringSelectMenuBuilder().setOptions([
            {
              label: "true",
              value: "1",
              default: true,
            },
            {
              label: "false",
              value: "0",
              default: false,
            },
          ]);
        } else {
          return new StringSelectMenuBuilder().setOptions([
            {
              label: "true",
              value: "1",
              default: false,
            },
            {
              label: "false",
              value: "0",
              default: true,
            },
          ]);
        }

      case "channel":
        const channelSelect = new ChannelSelectMenuBuilder({
          channel_types: [ChannelType.GuildText, ChannelType.GuildVoice],
        });
        channelSelect.setPlaceholder("select channel");
        channelSelect.setMinValues(0);
        channelSelect.setMaxValues(1);

        return channelSelect;
      case "channels":
        const channelsSelect = new ChannelSelectMenuBuilder({
          channel_types: [ChannelType.GuildText, ChannelType.GuildVoice],
        });
        channelsSelect.setPlaceholder("select channels");
        channelsSelect.setMinValues(0);
        channelsSelect.setMaxValues(25);

        return channelsSelect;
      case "textChannel":
        const textchannelSelect = new ChannelSelectMenuBuilder({
          channel_types: [ChannelType.GuildText],
        });
        textchannelSelect.setPlaceholder("select text channel");
        textchannelSelect.setMinValues(0);
        textchannelSelect.setMaxValues(1);

        return textchannelSelect;
      case "textChannels":
        const textchannelsSelect = new ChannelSelectMenuBuilder({
          channel_types: [ChannelType.GuildText],
        });
        textchannelsSelect.setPlaceholder("select text channels");
        textchannelsSelect.setMinValues(0);
        textchannelsSelect.setMaxValues(25);

        return textchannelsSelect;
      case "voiceChannel":
        const voicechannelSelect = new ChannelSelectMenuBuilder({
          channel_types: [ChannelType.GuildVoice],
        });
        voicechannelSelect.setPlaceholder("select voice channel");
        voicechannelSelect.setMinValues(0);
        voicechannelSelect.setMaxValues(1);

        return voicechannelSelect;
      case "voiceChannels":
        const voicechannelsSelect = new ChannelSelectMenuBuilder({
          channel_types: [ChannelType.GuildVoice],
        });
        voicechannelsSelect.setPlaceholder("select voice channels");
        voicechannelsSelect.setMinValues(0);
        voicechannelsSelect.setMaxValues(25);

        return voicechannelsSelect;
      case "member":
        const memberSelect = new UserSelectMenuBuilder();
        memberSelect.setPlaceholder("select member");
        memberSelect.setMinValues(0);
        memberSelect.setMaxValues(1);

        return memberSelect;
      case "members":
        const membersSelect = new MentionableSelectMenuBuilder();
        membersSelect.setPlaceholder("select members");
        membersSelect.setMinValues(0);
        membersSelect.setMaxValues(25);

        return membersSelect;
      case "role":
        console.log("at role");
        const roleSelect = new RoleSelectMenuBuilder();
        roleSelect.setPlaceholder("select role");
        roleSelect.setMinValues(0);
        roleSelect.setMaxValues(1);

        return roleSelect;
      case "roles":
        const rolesSelect = new RoleSelectMenuBuilder();
        rolesSelect.setPlaceholder("select roles");
        rolesSelect.setMinValues(0);
        rolesSelect.setMaxValues(25);

        return rolesSelect;
      case "select":
        const Select = new StringSelectMenuBuilder();
        Select.setPlaceholder(
          `select ${options.data.validValues.min} to ${options.data.validValues.max} items`
        );
        Select.setMinValues(options.data.validValues.min);
        Select.setMaxValues(options.data.validValues.max);
        options.data.validValues.values.forEach(async (validValue: any) => {
          Select.addOptions([
            {
              label: validValue,
              value: validValue,
              default: options.data.settingValue.includes(validValue),
            },
          ]);
        });
        return Select;
    }
    const button = new ButtonBuilder();
    button
      .setDisabled(true)
      .setLabel("something went wrong")
      .setStyle(ButtonStyle.Secondary);
    return button;
  },
} as button;
