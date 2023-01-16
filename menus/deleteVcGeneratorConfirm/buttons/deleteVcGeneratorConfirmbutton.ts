import {
  ButtonBuilder,
  ButtonInteraction,
  ButtonStyle,
  Client,
  MessageActionRowComponentBuilder,
} from "discord.js";
import { Model } from "mongoose";
import generatorSchema from "../../../commanddirs/generator/models/generatorSchema";
import { button } from "../../../handler/typings";

export default {
  callback: async (
    client: Client,
    interaction: ButtonInteraction,
    model: Model<any>,
    data?: any
  ) => {
    interaction.deferUpdate();
    console.log('got here')
    console.log(data)
    let generator = await generatorSchema.findOne({ channelId: data });
    console.log(generator)
    let channel = await client.channels.fetch(generator?.channelId || "");
    channel?.delete();
    generator?.delete();
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
