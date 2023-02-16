import {
  ActionRowBuilder,
  ButtonInteraction,
  ChatInputCommandInteraction,
  Client,
  ModalBuilder,
  ModalSubmitInteraction,
  SelectMenuInteraction,
  TextInputBuilder,
} from "discord.js";
import { Menus } from "../handler/menuhandlre";
import { modal } from "../handler/typings";

export default {
  callback: async (options: {
    client: Client;
    interaction: ModalSubmitInteraction;
    data?: any;
  }) => {
    let newData = options.data.menu
    const value = options.interaction.fields.getTextInputValue("string")
    newData.newValue = value;
    newData.snewValue = value;
    options.interaction.deferUpdate()
    Menus.update({
      messageId: options.data.messageId,
      client: options.client,
      data: newData,
    });
  },
  create: async (
    options: {
      client: Client;
      interaction:
        | ButtonInteraction
        | SelectMenuInteraction
        | ChatInputCommandInteraction;
      data?: any;
    },
    modal: ModalBuilder
  ) => {
    modal.setTitle("Input");
    const Input = new TextInputBuilder();
    Input.setCustomId("string");
    Input.setStyle(1);
    Input.setLabel("String");
    Input.setValue(options.data.menu.settingValue);
    const ActionRow = new ActionRowBuilder<TextInputBuilder>();
    ActionRow.addComponents(Input);
    modal.addComponents(ActionRow);
    await options.interaction.showModal(modal);
  },
} as modal;
