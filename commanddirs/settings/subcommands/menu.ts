import { Client, ChatInputCommandInteraction, TextChannel } from "discord.js";
import { Menus } from "../../../handler/menuhandlre";
import menuSchema from "../../../handler/models/menuSchema";
import { subcommand, subcommandobject } from "../../../handler/typings";

export default {
  description: "opens menu for managing settings",
  path: "",
  command: "",
  callback: async (client, interaction) => {
    Menus.create({
      menu: "settingsMenu",
      client: client,
      where: interaction,
      deleteAfter: 120,
      ephemeral: true,
      saveMenu: true,
      data: { page: 1 },
    });
  },
} as subcommandobject;
