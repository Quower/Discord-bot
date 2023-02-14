import DiscordJS, {
  Events,
  PermissionsBitField,
  ChatInputCommandInteraction,
  Client,
  DMChannel,
  ModalSubmitInteraction,
} from "discord.js";
import { botOwners } from "../../index";
import { commandsExport, menusExport } from "../setup";
import { client } from "../../index";
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
        messageId: interaction.customId
      });
      let menuobject = (await menusExport).find(
        (menu) => menu.name == menuschema?.currentMenu
      );
      let run = require(`${menuobject?.path}input.ts`);
      run({client: client, message: interaction.fields.getTextInputValue('string'), data: menuschema?.data});//continiue here
    }
  },
} as myEvent;
