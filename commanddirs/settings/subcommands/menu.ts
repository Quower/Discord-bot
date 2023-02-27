import { Menus } from "../../../handler/menuhandlre";
import { subcommandobject } from "../../../handler/typings";

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
