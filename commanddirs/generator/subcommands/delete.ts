import {
  Client,
  CommandInteraction,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
} from "discord.js";
import { subcommand } from "../../../handler/models/subcommand";
import generatorSchema from "../../../mongodb/generator";
import { Select_Generator } from "../funtions/generator_selector";

export default {
  description: "",
  options: [],
  callback: async (client: Client, interaction: CommandInteraction) => {
    if (client == undefined && interaction == undefined) {
      return;
    }
    const row = await Select_Generator(
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
    interaction.editReply({
      embeds: [embed2],
      components: [row, row2],
    });
  },
} as subcommand;
