import { Events, Client, ModalSubmitInteraction } from "discord.js";
import { menusExport } from "../setup";
import { myEvent } from "../typings";
import menuSchema from "../models/menuSchema";

export default {
  event: Events.InteractionCreate,
  execute: async (
    interaction, //: DiscordJS.Interaction<DiscordJS.CacheType>,
    client: Client
  ) => {
    if (interaction instanceof ModalSubmitInteraction) {
      let menuschema = await menuSchema.findOne({
        messageId: interaction.customId,
      });
      let menuobject = (await menusExport).find(
        (menu) => menu.name == menuschema?.currentMenu
      );
      let run = require(`../.${menuobject?.path}input.ts`).default;
      interaction.deferUpdate();
      run({
        client: client,
        message: interaction.fields.getTextInputValue("string"),
        data: menuschema?.data,
        messageId: menuschema?.messageId,
      }); //continiue here
    }
  },
} as myEvent;
