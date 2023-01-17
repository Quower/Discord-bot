import {
  ButtonBuilder,
  ButtonInteraction,
  ButtonStyle,
  Client,
  MessageActionRowComponentBuilder,
} from "discord.js";
import { Model } from "mongoose";
import generatorSchema from "../../../commanddirs/generator/models/generatorSchema";
import { Menus } from "../../../handler/setup";
import { button } from "../../../handler/typings";

export default {
  callback: async (
    client: Client,
    interaction: ButtonInteraction,
    data?: any
  ) => {
    interaction.deferUpdate();
    let generator = await generatorSchema.findOne({ channelId: data });
    let channel = await client.channels.fetch(generator?.channelId || "");
    channel?.delete();
    generator?.delete();
    Menus.update({
      messageId: interaction.message.id,
      client: client,
      menu: "back",
    });
  },
  create: async (
    client: Client,
    guildId?: String,
    channelId?: String,
    userId?: String,
    Indms?: Boolean,
    data?: any
  ): Promise<MessageActionRowComponentBuilder> => {
    const button = new ButtonBuilder();
    button.setLabel("Confirm");
    button.setStyle(ButtonStyle.Danger);
    return button;
  },
} as button;
