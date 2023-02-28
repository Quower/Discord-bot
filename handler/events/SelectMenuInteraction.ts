import {
  ChannelSelectMenuInteraction,
  Client,
  Events,
  MentionableSelectMenuInteraction,
  RoleSelectMenuInteraction,
  StringSelectMenuInteraction,
  UserSelectMenuInteraction,
} from "discord.js";
import { botOwners } from "../../index";
import menuSchema from "../models/menuSchema";
import { buttonsExport } from "../setup";
import { myEvent } from "../typings";
export default {
  event: Events.InteractionCreate,
  execute: async (interaction, client: Client) => {
    if (
      interaction instanceof StringSelectMenuInteraction ||
      interaction instanceof RoleSelectMenuInteraction ||
      interaction instanceof MentionableSelectMenuInteraction ||
      interaction instanceof UserSelectMenuInteraction ||
      interaction instanceof ChannelSelectMenuInteraction
    ) {
      if (client == undefined || interaction == undefined) {
        console.log("no client or interaction");
        return;
      }
      let menuschema = await menuSchema.findOne({
        messageId: interaction.message.id,
      });
      let buttonObject = (await buttonsExport).find(
        (button) => button.name == interaction.customId
      );
      if (menuschema == undefined) {
        console.log("no menuschema found on selectmenu");
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
      if (menuschema.userIds.length > 0) {
        const userIds: Array<String> = menuschema.userIds;
        if (
          userIds.includes(interaction.user.id) == false ||
          botOwners.includes(interaction.user.id) == false ||
          interaction.user.id != interaction.guild.ownerId
        ) {
          interaction.reply({
            content: "You are not permitted to interact with this menu",
            ephemeral: true,
          });
          return;
        }
      }
      await buttonObject.callback({
        client: client,
        interaction: interaction,
        data: menuschema.data,
        waitingForResponse: menuschema.waitingForResponse || false,
        model: menuschema
      });
      menuschema.save();
    }
  },
} as myEvent;
