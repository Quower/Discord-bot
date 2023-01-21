import {
    Client,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    EmbedBuilder,
    ChatInputCommandInteraction,
    TextChannel,
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
      if (interaction.channel instanceof TextChannel )
      Menus.create({
        menu: 'genereatorsMenu',
        client: client,
        where: interaction,
        deleteAfter: 30,
        ephemeral: true,
        saveMenu: true
      })
    },
  } as subcommand;
  