import {
  ButtonBuilder,
  ButtonStyle,
  MessageActionRowComponentBuilder,
} from "discord.js";
import { button } from "../../../handler/typings";
import { Menus } from "../../../handler/menuhandlre";

export default {
  callback: async (options) => {
    options.interaction.deferUpdate();
    console.log("heeeeeeere");
    options.data.selected.forEach(async (select: any) => {
      console.log(`deleting: ${select}`);
      await Menus.delete({ messageId: select, client: options.client });
    });
    await Menus.update({
      messageId: options.interaction.message.id,
      client: options.client,
      menu: "back",
    });
  },
  create: async (options): Promise<MessageActionRowComponentBuilder> => {
    const button = new ButtonBuilder();
    button.setLabel("Confirm");
    console.log(options.data.selectm);
    if (!(options.data.selectm == true)) {
      button.setDisabled(true);
    }
    button.setStyle(ButtonStyle.Success);
    return button;
  },
} as button;
