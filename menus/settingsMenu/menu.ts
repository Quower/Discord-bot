import {
  BaseMessageOptions,
  Client,
  CommandInteraction,
  EmbedBuilder,
} from "discord.js";
import { settingcategorys } from "../../commanddirs/settings/events/ready";
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
    const pages = Math.ceil(settingcategorys.length / 5);
    if (!options.data.page) {
      throw console.error("no page in data");
    }
    const embed = new EmbedBuilder();
    embed.setTitle("Settings Menu");
    embed.setDescription("```\npick a settings category to view\n```");
    options.data = {
      currentPage: options.data.page,
      totalPages: pages,
      categorydata: new Array<{ name: string; description: string ; display: string;}[]>(),
    };
    console.log(settingcategorys)
    for (let i = (options.data.currentPage-1)*5; i < options.data.currentPage*5; i++) {
      console.log(i)
      if (settingcategorys[i]) {
        embed.addFields({
          name: settingcategorys[i].display,
          value: `${"``"}${settingcategorys[i].description}${"``"}`,
          
        });
        options.data.categorydata.push({
          name: settingcategorys[i].name,
          description: settingcategorys[i].description,
          display: settingcategorys[i].display
        });
      }
    }
    embed.setFooter({ text: `page ${options.data.currentPage} of ${pages}` });
    let menu = await new UkMessageBuilder().build(options, {
      rows: [
        
        ["preveousButton", "nextButton","exitButton"],
        ["settingsMenuSelector"]
      ],
      embeds: [embed],
    });
    return menu;
  },
} as menu;
