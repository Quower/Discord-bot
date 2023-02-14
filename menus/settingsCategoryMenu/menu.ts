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
    const pages = Math.ceil(settingsCategory?.settings.length / 5);
    if (!options.data.page) {
      throw console.error("no page in data");
    }
    const embed = new EmbedBuilder();
    embed.setTitle(settingsCategory.display);
    embed.setDescription("pick a setting to view");
    options.data = {
      currentPage: options.data.page,
      totalPages: pages,
      settingdata: new Array<
        { name: string; description: string; display: string }[]
      >(),
    };
    const settingsHandler = new SettingsHandler();
    await settingsHandler.init({
      client: options.client,
      guildId: options.guildId || "",
    });
    for (
      let i = (options.data.currentPage - 1) * 5;
      i < options.data.currentPage * 5;
      i++
    ) {
      console.log(i);

      if (settingsCategory.settings[i]) {
        console.log(settingsCategory.settings[i]);

        if (
          settingsCategory.settings[i].type == "string" ||
          settingsCategory.settings[i].type == "boolean"
        ) {
          const value = await settingsHandler.read({
            optionName: settingsCategory.settings[i].name,
            retunrAs: "raw",
          });
          embed.addFields({
            name: `${settingsCategory.settings[i].display} [${settingsCategory.settings[i].type}]`,
            value: `${"``"}${
              settingsCategory.settings[i].description
            }${"``"}\n${value}`,
          });
        } else if (
          settingsCategory.settings[i].type == "channel" ||
          settingsCategory.settings[i].type == "textChannel" ||
          settingsCategory.settings[i].type == "voiceChannel" ||
          settingsCategory.settings[i].type == "member" ||
          settingsCategory.settings[i].type == "role"
        ) {
          let value = await settingsHandler.read({
            optionName: settingsCategory.settings[i].name,
            retunrAs: "mention",
          });
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
          embed.addFields({
            name: `${settingsCategory.settings[i].display} [${settingsCategory.settings[i].type}]`,
            value: `${"``"}${
              settingsCategory.settings[i].description
            }${"``"}\n${value}`,
          });
        } else if (
          settingsCategory.settings[i].type == "channels" ||
          settingsCategory.settings[i].type == "textChannels" ||
          settingsCategory.settings[i].type == "voiceChannels" ||
          settingsCategory.settings[i].type == "members" ||
          settingsCategory.settings[i].type == "roles"
        ) {
          let values = await settingsHandler.read({
            optionName: settingsCategory.settings[i].name,
            retunrAs: "mention",
          });
          if (values.length < 1) {
            values = "null";
          } else {
            values = values.toString();
          }
          embed.addFields({
            name: `${settingsCategory.settings[i].display} [${settingsCategory.settings[i].type}]`,
            value: `${"``"}${
              settingsCategory.settings[i].description
            }${"``"}\n${values}`,
          });
        } else if (settingsCategory.settings[i].type == "perms") {
          let values = await settingsHandler.read({
            optionName: settingsCategory.settings[i].name,
            retunrAs: "mention",
          });
          if (values.length < 1) {
            values = "null";
            embed.addFields({
              name: `${settingsCategory.settings[i].display} [${settingsCategory.settings[i].type}]`,
              value: `${"``"}${
                settingsCategory.settings[i].description
              }${"``"}\n${values}`,
            });
          } else {
            let newValues = "";
            for (const value of values) {
              newValues = `${newValues}[[${value.permissions.toString()}],[${value.members.toString()}],[${value.roles.toString()}]]\n`;
            }
            embed.addFields({
              name: `${settingsCategory.settings[i].display} [${settingsCategory.settings[i].type}]`,
              value: `${"``"}${
                settingsCategory.settings[i].description
              }${"``"}\n${newValues}`,
            });
          }
        }

        // const value = await settingsHandler.read({
        //   optionName: settingsCategory.settings[i].name,
        //   retunrAs: "mention",
        // });
        // embed.addFields({
        //   name: settingsCategory.settings[i].display,
        //   value: `${"``"}${
        //     settingsCategory.settings[i].description
        //   }${"``"}\n${value}`,
        // });
        options.data.settingdata.push({
          name: settingsCategory.settings[i].name,
          description: settingsCategory.settings[i].description,
          display: settingsCategory.settings[i].display,
        });
      }
    }
    embed.setFooter({ text: `page ${options.data.currentPage} of ${pages}` });
    let menu = await new UkMessageBuilder().build(options, {
      rows: [
        ["preveousButton", "nextButton", "backButton"],
        ["settingsCategoryMenuSelector"]
      ],
      embeds: [embed],
    });
    return menu;
  },
} as menu;
