import { Menus } from "../../../handler/menuhandlre";
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
      data: { selected: new Array<string>() },
    });
  },
} as subcommand;
