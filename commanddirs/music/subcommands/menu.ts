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
      // const settings = new SettingsHandler();
      // await settings.init({
      //   client: client,
      //   guildId: interaction.guildId || "",
      // });
      // const forceInput = await settings.read({
      //   settingName: "musicForceInput",
      //   retunrAs: "raw",
      // });
      // if (forceInput) {
      //   const menudb = await menuSchema.findOne({
      //     channelId: interaction.channelId,
      //     waitingForResponse: true,
      //   });
      //   if (menudb) {
      //     await Menus.delete({
      //       client: client,
      //       messageId: menudb?.messageId || "",
      //     });
      //   }
      // }

      const menudb2 = await menuSchema.find({
        guildId: interaction.guildId,
        currentMenu: "musicMenu",
        deleteAfter: 0,
      });
      if (menudb2.length >= 5) {
        interaction.reply({
          ephemeral: true,
          content:
            "maximum number of permanent music menus reached please delete some using ``/music delete``",
        });
        return;
      }
      //console.log(`forceinput${forceInput}`);

      await Menus.create({
        menu: "musicMenu",
        client: client,
        where: interaction.channel,
        deleteAfter: 0,
        ephemeral: false,
        saveMenu: true,
        data: { action: "none" },
        waitingForResponse: true,
      });
      interaction.reply({
        ephemeral: true,
        content: "created music menu",
      });
    }
  },
} as subcommand;
