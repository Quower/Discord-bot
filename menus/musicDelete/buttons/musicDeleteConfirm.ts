import {
  ButtonBuilder,
  ButtonInteraction,
  ButtonStyle,
  Client,
  MessageActionRowComponentBuilder,
} from "discord.js";
import { button } from "../../../handler/typings";
import { Menus } from "../../../handler/menuhandlre";
import SettingsHandler from "../../../handler/settingshandler";
import menuSchema from "../../../handler/models/menuSchema";

export default {
  callback: async (options) => {
    options.interaction.deferUpdate()
    console.log('heeeeeeere')
    options.data.selected.forEach(async (select: any) => {
      console.log(`deleting: ${select}`)
      await Menus.delete({ messageId: select, client: options.client });
    });
    //options.data.selected = []
    await Menus.update({
      messageId: options.interaction.message.id,
      client: options.client,
      //data: options.data
      menu: "back",
    });
  },
  create: async (options): Promise<MessageActionRowComponentBuilder> => {
    const button = new ButtonBuilder();
    button.setLabel("Confirm");
    console.log(options.data.selectm)
    if (!(options.data.selectm == true)) {
      button.setDisabled(true);
    }
    button.setStyle(ButtonStyle.Success);
    return button;
  },
} as button;
