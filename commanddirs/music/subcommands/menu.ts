import { Client, ChatInputCommandInteraction, TextChannel } from "discord.js";
import { Menus } from "../../../handler/menuhandlre";
import menuSchema from "../../../handler/models/menuSchema";
import SettingsHandler from "../../../handler/settingshandler";
import { subcommand } from "../../../handler/typings";

export default {
  description: "opens music playing menu",
  callback: async (client, interaction) => {
    if (client == undefined && interaction == undefined) {
      return;
    }
    if (interaction.channel instanceof TextChannel) {
      const menudb = await menuSchema.findOne({
        channelId: interaction.channelId,
        waitingForResponse: true,
      });
      if (menudb) {
        await Menus.delete({
          client: client,
          messageId: menudb?.messageId || "",
        });
      }

      const settings = new SettingsHandler();
      await settings.init({
        client: client,
        guildId: interaction.guildId || "",
      });

      const forceInput = await settings.read({
        settingName: "musicForceInput",
        retunrAs: "raw",
      });
      //console.log("ffffffffffffffffffffffffffff")
      //console.log(forceInput)

      await Menus.create({
        menu: "musicMenu",
        client: client,
        where: interaction.channel,
        deleteAfter: 120,
        ephemeral: false,
        saveMenu: true,
        data: { playerid: 1 },
        waitingForResponse: forceInput,
      });
      interaction.reply({
        ephemeral: true,
        content: "created music menu",
      });
    }
  },
} as subcommand;
