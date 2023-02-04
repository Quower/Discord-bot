import {
    Client,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    EmbedBuilder,
    ChatInputCommandInteraction,
    TextChannel,
  } from "discord.js";
  import { Menus } from "../../../handler/menuhandlre";
  import { subcommand } from "../../../handler/typings";
  import { Select_Generator } from "../funtions/generator_selector";
  
  export default {
    description: "open vc generator managment menu",
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
  