import {
  ButtonBuilder,
  ButtonInteraction,
  ButtonStyle,
  Client,
  MessageActionRowComponentBuilder,
} from "discord.js";
import generatorSchema from "../../../commanddirs/generators/models/generatorSchema";
import { Menus } from "../../../handler/menuhandlre";
import { button } from "../../../handler/typings";

export default {
  callback: async (options) => {
    options.interaction.deferUpdate();
    let generator = await generatorSchema.findOne({ channelId: options.data });
    let channel = await options.client.channels.fetch(
      generator?.channelId || ""
    );
    channel?.delete();
    generator?.delete();
    Menus.update({
      messageId: options.interaction.message.id,
      client: options.client,
      menu: "back",
    });
  },
  create: async (options): Promise<MessageActionRowComponentBuilder> => {
    const button = new ButtonBuilder();
    button.setLabel("Confirm");
    button.setStyle(ButtonStyle.Danger);
    return button;
  },
} as button;
