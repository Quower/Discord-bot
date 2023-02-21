import { BaseMessageOptions, Client, EmbedBuilder } from "discord.js";
import { UkMessageBuilder } from "../../handler/setup";
import { menu } from "../../handler/typings";

export default {
  create: async (options): Promise<BaseMessageOptions> => {
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
