import { Client, CommandInteraction, EmbedBuilder } from "discord.js";
import { UkMessageBuilder } from "../../handler/setup";
import { menu, returnMenu } from "../../handler/typings";
import Handler from "../../handler/setup";

export default {
  create: async (options: {
    client: Client;
    waitingForResponse: boolean;
    guildId?: String;
    channelId?: String;
    userIds?: String[];
    Indms?: Boolean;
  }): Promise<returnMenu> => {
    const embed = new EmbedBuilder();
    embed.setTitle("Delete Vc generator!");
    embed.setDescription(
      "interesting information about deleteing vc generator"
    );

    let menu = await new UkMessageBuilder({
      content: "weed",
      row1: ["deleteVcGeneratorSelectorSelectMenu"],
      row2: ["deleteVcGeneratorSelectorSelectMenu"],
      embeds: [embed],
      client: options.client,
      guildId: options.guildId,
      channelId: options.channelId,
      userIds: options.userIds,
      Indms: options.Indms,
    });
    console.log(JSON.stringify(
      menu,
      null,
      "  "
    ))
    return menu;
  },
} as menu;
