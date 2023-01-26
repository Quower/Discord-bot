import {
  BaseMessageOptions,
  Client,
  CommandInteraction,
  EmbedBuilder,
} from "discord.js";
import { UkMessageBuilder } from "../../handler/setup";
import { menu } from "../../handler/typings";
import Handler from "../../handler/setup";

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
    const embed = new EmbedBuilder();
    embed.setTitle("Delete Vc generator!");
    embed.setDescription(
      "interesting information about deleteing vc generator"
    );
    let menu = await new UkMessageBuilder().build(options, {
      rows: [
        ["deleteVcGeneratorSelectorSelectMenu"],
        ["deleteVcGeneratorSelectorCancelbutton"],
      ],
      embeds: [embed],
    });
    return menu;
  },
} as menu;
