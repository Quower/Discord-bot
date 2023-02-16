import {
  Client,
  ChatInputCommandInteraction,
  PermissionsBitField,
  ActionRowBuilder,
  SelectMenuBuilder,
  ComponentType,
} from "discord.js";
import { command } from "../handler/typings";
// const deleteVcGeneratorSelectorCancelbutton = require('../menus/deleteVcGeneratorSelector/buttons/deleteVcGeneratorSelectorSelectMenu.ts')

export default {
  description: "command",
  allowInDMs: false,
  ownerOnly: true,
  testOnly: true,
  permissions: [PermissionsBitField.Flags.Administrator],
  MainCommand: true,
  callback: async (
    client: Client,
    interaction: ChatInputCommandInteraction
  ) => {
    let Row = new ActionRowBuilder<SelectMenuBuilder>();
    const roleSelect = new SelectMenuBuilder({
      type: ComponentType.RoleSelect,
    });
    roleSelect.setPlaceholder("select role");
    roleSelect.setMinValues(0);
    roleSelect.setMaxValues(1);
    roleSelect.setCustomId('hiina')
    Row.addComponents(roleSelect)
    await interaction.reply({
        content: 'test',
        components: [Row]
    })
    const message = await interaction.fetchReply()
    const collector = message.createMessageComponentCollector({ componentType: ComponentType.RoleSelect, time: 15000 });
    console.log(collector)
    collector.on('collect', i => {
        console.log(i)
    });
  },
} as command;
