import { Events, Client, ModalSubmitInteraction } from "discord.js";
import { menusExport, modalExports } from "../setup";
import { myEvent } from "../typings";
import menuSchema from "../models/menuSchema";
import modalSchema from "../models/modalSchema";

export default {
  event: Events.InteractionCreate,
  execute: async (
    interaction, //: DiscordJS.Interaction<DiscordJS.CacheType>,
    client: Client
  ) => {
    if (interaction instanceof ModalSubmitInteraction) {
      const modaldb = await modalSchema.findById(interaction.customId);
      if (!modaldb) {
        interaction.reply({
          content: "modal not found",
          ephemeral: true,
        });
        return;
      }
      const modal = modalExports.find(
        (modal) => modal.name == modaldb.modalName
      );
      if (!modal) {
        console.log("something went wrong when finding modal");
        return;
      }
      console.log(modaldb)
      await modal.callback({
        client: client,
        interaction: interaction,
        data: modaldb.data,
      });
      await modaldb.delete();
    }
  },
} as myEvent;
