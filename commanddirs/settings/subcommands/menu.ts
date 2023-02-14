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
  
  export default {
    description: "opens menu for managing settings",
    callback: async (client: Client, interaction: ChatInputCommandInteraction) => {
      if (client == undefined && interaction == undefined) {
        return;
      }
      if (interaction.channel instanceof TextChannel )
      Menus.create({
        menu: 'settingsMenu',
        client: client,
        where: interaction,
        deleteAfter: 600,
        ephemeral: true,
        saveMenu: true,
        data: {page:1}
      })
    },
  } as subcommand;
  