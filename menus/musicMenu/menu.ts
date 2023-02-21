import { BaseMessageOptions, Client, EmbedBuilder } from "discord.js";
import { settingcategorys } from "../../handler/events/ready";
import SettingsHandler from "../../handler/settingshandler";
import { UkMessageBuilder } from "../../handler/setup";
import { menu } from "../../handler/typings";

export default {
  create: async (options): Promise<BaseMessageOptions> => {
    const settings = new SettingsHandler()
    await settings.init({
      client: options.client,
      guildId: options.guildId || ""
    })
    let row2 = ["exitButton"]
    if (await settings.read({settingName: "musicMessageInput", retunrAs: "raw"})) {
      row2.push('InputButton')

    }
    const embed = new EmbedBuilder()
    embed.setTitle('Music Menu')
    //if (options.data.lastInput) {
      embed.setDescription(options.data.lastInput || "none")
    // } else {
    //   embed.setDescription("none")
    // }
    
    let menu = await new UkMessageBuilder().build(options, {
      rows: [
        ["backButton"],
        row2,
      ],
      embeds: [embed]
    });
    return menu;
  },
} as menu;
