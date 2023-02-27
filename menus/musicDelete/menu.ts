import { BaseMessageOptions, EmbedBuilder } from "discord.js";
import menuSchema from "../../handler/models/menuSchema";
import { UkMessageBuilder } from "../../handler/setup";
import { menu } from "../../handler/typings";

export default {
  create: async (options): Promise<BaseMessageOptions> => {
    if (!options.data.result) {
      const menudb = await menuSchema.find({
        guildId: options.guildId,
        currentMenu: "musicMenu",
        deleteAfter: 0,
        waitingForResponse: true,
      });
      if (menudb.length > 0) {
        let result = new Array();
        for (const men of menudb) {
          result.push({
            messageId: men.messageId,
            channelId: men.channelId,
          });
        }
        options.data.result = result;
      } else {
        const embed = new EmbedBuilder();
        embed.setTitle("No music menus in this server");
        const menu = await new UkMessageBuilder().build(options, {
          rows: [["cancelButton"]],
          embeds: [embed],
        });
        return menu;
      }
    }

    const embed = new EmbedBuilder();

    embed.setTitle("Select music menus to delete");

    embed.setDescription(
      `${options.data.result
        .map((res: any, i: number) => `**${i + 1}**. <#${res.channelId}>`)
        .join("\n")}`
    );
    const menu = await new UkMessageBuilder().build(options, {
      rows: [["musicDeleteSelect"], ["cancelButton", "musicDeleteConfirm"]],
      embeds: [embed],
    });
    return menu;
  },
} as menu;
