import {
  ActionRowBuilder,
  AnyComponentBuilder,
  ChatInputCommandInteraction,
  Client,
  EmbedBuilder,
  MessageActionRowComponentBuilder,
  SelectMenuBuilder,
  SelectMenuInteraction,
  VoiceChannel,
} from "discord.js";
import { Model } from "mongoose";
import generatorSchema from "../../../commanddirs/generator/models/generatorSchema";
import { Menus } from "../../../handler/setup";
import { button } from "../../../handler/typings";

export default {
  callback: async (client: Client, interaction: SelectMenuInteraction, data?: any) => {
    interaction.deferUpdate()
    console.log(interaction.values[0])
    Menus.update({
      messageId: interaction.message.id,
      client: client,
      menu: 'deleteVcGeneratorConfirm',
      data: interaction.values[0]
    })
  },
  create: async (
    client: Client,
    guildId?: String,
    channelId?: String,
    userId?: String,
    Indms?: Boolean,
    data?: any
  ): Promise<MessageActionRowComponentBuilder> => {
    const generators = await generatorSchema.find({ guildId: guildId });
    const selectMenu = new SelectMenuBuilder()
      .setMaxValues(1)
      .setMinValues(1)
      .setPlaceholder("Nothing Selected")
    if(!generators) {selectMenu.setDisabled
    selectMenu.setPlaceholder("This guild doesn't have any generators")}
    await generators.forEach( (generator) => {
      if (generator.channelId) {
        const channel = client.channels.cache.get(generator.channelId);
        if (channel instanceof VoiceChannel) {
          selectMenu.addOptions([
            {
              label: `${channel.name}`,
              description: `${channel.position}`,
              value: generator.channelId,
              emoji: `1034894487236902942`,
            },
          ]);
        } else {
          selectMenu.addOptions([
            {
              label: `${"#deleted-channel"}`,
              description: `${"stuff"}`,
              value: generator.channelId,
              emoji: `1034894487236902942`,
            },
          ]);
        }
      }
    });
    

    return selectMenu;
  },
} as button;
