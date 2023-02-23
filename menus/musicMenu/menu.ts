import { BaseMessageOptions, Client, EmbedBuilder } from "discord.js";
import { player } from "../..";
import { settingcategorys } from "../../handler/events/ready";
import SettingsHandler from "../../handler/settingshandler";
import { UkMessageBuilder } from "../../handler/setup";
import { menu } from "../../handler/typings";

export default {
  create: async (options): Promise<BaseMessageOptions> => {
    //console.log(`data at musicmenu:`)
    //console.log(options.data)
    //options.data.hiinlane = "erki "
    const settings = new SettingsHandler();
    await settings.init({
      client: options.client,
      guildId: options.guildId || "",
    });
    let row2 = ["exitButton"];
    const messageinput = await settings.read({
      settingName: "musicMessageInput",
      retunrAs: "raw",
    })
    const forceInput = await settings.read({
      settingName: "musicForceInput",
      retunrAs: "raw",
    })
    if ( messageinput == true && forceInput == false
      
    ) {
      row2.push("InputButton");
    }
    const embed = new EmbedBuilder();
    embed.setTitle("Music Menu");
    //if (options.data.lastInput) {
    embed.setDescription(options.data.lastInput || "none");
    // } else {
    //   embed.setDescription("none")
    // }
    let row1 = ["musicJoinButton"]
    if (player.getQueue(options.guildId || '')) {
      row1 = ['musicLeaveButton']
    }


    let menu = await new UkMessageBuilder().build(options, {
      rows: [row1, row2],
      embeds: [embed],
    });
    return menu;
  },
} as menu;
