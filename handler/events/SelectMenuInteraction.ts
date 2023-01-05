import DiscordJS, { Events, SelectMenuInteraction } from "discord.js";
import { botOwners, client } from "../../index";
import menuSchema from "../models/menuSchema";
import { buttonsExport } from "../setup";
export default async function (interaction: DiscordJS.Interaction<DiscordJS.CacheType>) {
  if (interaction instanceof SelectMenuInteraction) {
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
    if (menuschema == undefined || buttonObject == undefined) {
      console.log("no menuschema or buttonobject");
      return;
    }
    if (menuschema.userIds instanceof Array<String>) {
      const userIds: Array<String> = menuschema.userIds;
      if (
        userIds.includes(interaction.user.id) == false &&
        botOwners.includes(interaction.user.id) == false
      ) {
        interaction.reply({
          content: "You are not permitted to interact with this menu",
          ephemeral: true,
        });
        return;
      }
    }
    buttonObject.callback(client, interaction, menuschema);
  }
}
