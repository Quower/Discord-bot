import DiscordJS, { ButtonInteraction, Client, Events } from "discord.js";
import { botOwners } from "../../index";
import menuSchema from "../models/menuSchema";
import { buttonsExport } from "../setup";
import { myEvent } from "../typings";

export default {
  event: Events.InteractionCreate,
  execute: async (
    interaction, //: DiscordJS.Interaction<DiscordJS.CacheType>,
    client: Client
  ) => {
    if (interaction instanceof ButtonInteraction) {
      if (client == undefined || interaction == undefined) {
        console.log("no client or interaction");
        return;
      }
      let menuschema = await menuSchema.findOne({
        messageId: interaction.message.id,
      });
      const buttonObject = await buttonsExport.find(
        (button) => button.name == interaction.customId
      );
      if (menuschema == undefined) {
        console.log("no menuschema found on button");
        interaction.reply({
          content: "this message is not a valid menu",
          ephemeral: true,
        });
        return;
      }
      if (buttonObject == undefined) {
        console.log("no buttonobject");
        return;
      }

      if (menuschema.userIds instanceof Array<String>) {
        const userIds: Array<String> = menuschema.userIds;
        if (
          userIds.includes(interaction.user.id) == false ||
          botOwners.includes(interaction.user.id) == false
        ) {
          interaction.reply({
            content: "You are not permitted to interact with this menu",
            ephemeral: true,
          });
          return;
        }
      }
      buttonObject.callback({
        client: client,
        interaction: interaction,
        data: menuschema.data,
      });
    }
  },
} as myEvent;
