import { Client, ChatInputCommandInteraction, TextChannel } from "discord.js";
import { Menus } from "../../../handler/menuhandlre";
import { subcommand } from "../../../handler/typings";

export default {
  description: "delete a vc generator",
  callback: async (
    client,
    interaction
  ) => {
    if (client == undefined && interaction == undefined) {
      return;
    }
    if (interaction.channel instanceof TextChannel)
      Menus.create({
        menu: "deleteVcGeneratorSelector",
        client: client,
        where: interaction,
        deleteAfter: 10,
        ephemeral: false,
        saveMenu: false,
      });
    // interaction.reply({
    //   content:'menu created',
    //   ephemeral: true
    // })
    /*const row = await Select_Generator(
      interaction.guild,
      "deletechannel",
      1,
      1,
      client
    );
    const row2 = new ActionRowBuilder<ButtonBuilder>();
    row2.addComponents(
      new ButtonBuilder()
        .setCustomId("deletechannelcancel")
        .setLabel("Cancel")
        .setStyle(ButtonStyle.Secondary)
    );
    const embed2 = new EmbedBuilder();
    embed2.setTitle(":loud_sound: Delete generator");
    interaction.reply({
      embeds: [embed2],
      components: [row, row2],
      ephemeral: true
    });*/
  },
} as subcommand;
