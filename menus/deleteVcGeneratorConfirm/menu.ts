import { BaseMessageOptions, Client, EmbedBuilder } from "discord.js";
import { UkMessageBuilder } from "../../handler/setup";
import { menu } from "../../handler/typings";

export default {
  create: async (options): Promise<BaseMessageOptions> => {
    console.log(`${options.data}    hhhh`);
    const embed = new EmbedBuilder();
    embed.setTitle("Delete Vc generator!");
    embed.setDescription(
      `Are you sure you want to delete a vc generator: <#${options.data}>`
    );

    let menu = await new UkMessageBuilder().build(options, {
      rows: [
        ["deleteVcGeneratorConfirmbutton", "deleteVcGeneratorCancelbutton"],
      ],
      embeds: [embed],
    });
    return menu;
  },
} as menu;
