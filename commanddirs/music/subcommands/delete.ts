import { Client, ChatInputCommandInteraction, TextChannel } from "discord.js";
import { Menus } from "../../../handler/menuhandlre";
import menuSchema from "../../../handler/models/menuSchema";
import SettingsHandler from "../../../handler/settingshandler";
import { subcommand } from "../../../handler/typings";

export default {
  description: "opens menu to delete music menus",
  callback: async (client, interaction) => {
    Menus.create({
        menu: "musicDelete",
        client: client,
        where: interaction,
        deleteAfter: 120,
        ephemeral: true,
        saveMenu: true,
        data: { selected: new Array<string> },
      });
    
  },
} as subcommand;
