import {
  BaseMessageOptions,
  Client,
  CommandInteraction,
  EmbedBuilder,
} from "discord.js";
import { settingcategorys } from "../../commanddirs/settings/events/ready";
import SettingsHandler from "../../commanddirs/settings/funtions";
import { UkMessageBuilder } from "../../handler/setup";
import { menu } from "../../handler/typings";

export default {
  create: async (options: {
    client: Client;
    waitingForResponse: boolean;
    guildId?: string;
    channelId: string;
    userIds: string[];
    Indms: boolean;
    data?: any;
  }): Promise<BaseMessageOptions> => {
    const settingsCategory = settingcategorys.find(
      (category) => category.name == options.data.category
    );
    if (!settingsCategory) {
      throw console.error("no setting category");
    }
    const settingBase = settingsCategory.settings.find(
      (setting) => setting.name == options.data.setting
    );
    const embed = new EmbedBuilder();
    embed.setTitle(`${settingBase?.display} [${settingBase?.type}]`);
    const settingsHandler = new SettingsHandler();
    await settingsHandler.init({
      client: options.client,
      guildId: options.guildId || "",
    });

    if (!settingBase) {
      throw console.error("no settingbase");
    }
    console.log(settingBase);
    let value = await settingsHandler.read({
      optionName: settingBase.name,
      retunrAs: "mention",
    });
    let description1 = "";
    let description2 = undefined;
    if (settingBase.type == "string" || settingBase.type == "boolean") {
      description1 = `${value}`;
      if (options.data.newValue) {
        description2 = 
          options.data.newValue
        
      }
    } else if (
      settingBase.type == "channel" ||
      settingBase.type == "textChannel" ||
      settingBase.type == "voiceChannel" ||
      settingBase.type == "member" ||
      settingBase.type == "role"
    ) {
      console.log(value);
      if (
        value == "<@null>" ||
        value == "<@>" ||
        value == "<#null>" ||
        value == "<#>" ||
        value == "<@&null>" ||
        value == "<@&>"
      ) {
        value = "null";
      }
      description1 = value
      if (options.data.newValue) {
        let value2 = options.data.newValue;
        if (
          value2 == "<@null>" ||
          value2 == "<@>" ||
          value2 == "<#null>" ||
          value2 == "<#>" ||
          value2 == "<@&null>" ||
          value2 == "<@&>"
        ) {
          value2 = "null";
        }
        description2 = value2;
      }
    } else if (
      settingBase.type == "channels" ||
      settingBase.type == "textChannels" ||
      settingBase.type == "voiceChannels" ||
      settingBase.type == "members" ||
      settingBase.type == "roles"
    ) {
      if (value.length < 1) {
        value = "null";
      } else {
        value = value.toString();
      }
      description1 = `${value}`;
      if (options.data.newValue) {
        let value2 = options.data.newValue;
        if (value2.length < 1) {
          value2 = "null";
        } else {
          value2 = value.toString();
        }
        description1 = value2;
      }
    } else if (settingBase.type == "perms") {
      if (value.length < 1) {
        value = "null";
        description1 = `${value}`;
      } else {
        let newValues = "";
        let i = 0;
        for (const valu of value) {
          i++;
          newValues = `${newValues}**Case ${i}:**\n${valu.permissions.toString()}\n${value.members.toString()},${value.roles.toString()}\n`;
        }
        description1 = newValues;
      }
      if (options.data.newValue) {
        console.log(options.data.newValue)
        let value2 = options.data.newValue;
        if (value2.length < 1) {
          value2 = "null";
          description1 = value2
        } else {2
          let newValues = "";
          let i = 0;
          for (const valu of value2) {
            i++;
            if (valu.permissions.length > 0)
            newValues = `${newValues}**Case ${i}:**\n${valu.permissions.toString() || ''}\n${value.members.toString() || ''},${value.roles.toString() || ''}\n`;
          }
          description2 = newValues;
        }
      }
    }

    options.data.validValues = settingBase?.validValues;
    options.data.settingType = settingBase?.type;

    if (options.data.newValue) {
      embed.setDescription(
        `${"``"}${settingBase.description}${"``"}\n----------\nCurrent value\n----------\n${description1}\n\n----------\nNew value\n(----------\n${description2}`
      );
    } else {
      embed.setDescription(
        `${"``"}${settingBase.description}${"``"}\n----------\nCurrent value\n----------\n${description1}`
      );
    }
    if (settingBase?.type == "perms") {
      if (options.data.selected = -1 || !options.data.selected) {
        options.data.settingValue = options.data.newValue || await settingsHandler.read({
          optionName: settingBase.name,
          retunrAs: "raw",
        });
        let menu = await new UkMessageBuilder().build(options, {
          rows: [["cancelButton", "settingEditConfirm"], ["permCaseSelect"]],
          embeds: [embed],
        });
        return menu;
      } else {
        let menu = await new UkMessageBuilder().build(options, {
          rows: [["settingEditSelect"], ["settingEditSelect5000"], ["backButton"]],
          embeds: [embed],
        });
        return menu;
      }
    } else {
      options.data.settingValue = options.data.newValue || await settingsHandler.read({
        optionName: settingBase.name,
        retunrAs: "raw",
      });
      let menu = await new UkMessageBuilder().build(options, {
        rows: [["cancelButton", "settingEditConfirm"], ["settingEditSelect"]],
        embeds: [embed],
      });
      return menu;
    }

    // let menu = await new UkMessageBuilder().build(options, {
    //   rows: [
    //     ["backButton"],
    //     //["settingsMenuSelector"]
    //   ],
    //   embeds: [embed],
    // });
  },
} as menu;
