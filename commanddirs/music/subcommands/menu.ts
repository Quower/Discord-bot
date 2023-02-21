import { Client, ChatInputCommandInteraction, TextChannel } from "discord.js";
import { Menus } from "../../../handler/menuhandlre";
import menuSchema from "../../../handler/models/menuSchema";
import { subcommand } from "../../../handler/typings";

export default {
  description: "opens music playing menu",
  callback: async (client, interaction) => {
    if (client == undefined && interaction == undefined) {
      return;
    }
    if (interaction.channel instanceof TextChannel) {
      const menudb = await menuSchema.findOne({ channelId: interaction.channelId });
      await Menus.delete({client: client, messageId: menudb?.messageId || ""})
      await Menus.create({
        menu: "musicMenu",
        client: client,
        where: interaction.channel,
        deleteAfter: 0,
        ephemeral: false,
        saveMenu: true,
        data: {playerid: 1}
      });
      interaction.reply({
        ephemeral: true,
        content: "created music menu",
      });
    }
  },
} as subcommand;
