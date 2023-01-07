import {
  Client,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  ChatInputCommandInteraction,
} from "discord.js";
import { Menus } from "../../../handler/setup";
import { subcommand } from "../../../handler/typings";
import { Select_Generator } from "../funtions/generator_selector";

export default {
  description: "delete a vc generator",
  callback: async (client: Client, interaction: ChatInputCommandInteraction) => {
    if (client == undefined && interaction == undefined) {
      return;
    }
    Menus.create({
      menu: 'deleteVcGeneratorSelector',
      client: client,
      where: interaction,
      deleteAfter: 5,
      ephemeral: true,
      saveMenu: false
    })
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
