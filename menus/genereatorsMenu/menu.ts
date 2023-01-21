import { BaseMessageOptions, Client, CommandInteraction, EmbedBuilder } from "discord.js";
import { UkMessageBuilder } from "../../handler/setup";
import { menu } from "../../handler/typings";
import Handler from "../../handler/setup";
import generatorSchema from "../../commanddirs/generators/models/generatorSchema";

export default {
  create: async (options: {
    client: Client;
    waitingForResponse: boolean;
    guildId?: String;
    channelId?: String;
    userIds?: String[];
    Indms?: Boolean;
    data?: any
  }): Promise<BaseMessageOptions> => {
    // const embed = new EmbedBuilder();
    // embed.setTitle("Delete Vc generator!");
    // embed.setDescription(
    //   "Menu for doing stuff for vc generators"
    // );
    console.log('got to menu we are tesing')
    let channels:string = ''
    await (
      await generatorSchema.find({ guildId: options.guildId })
    ).forEach((generator) => {
      channels = `${channels}• <#${generator.channelId}>\n`;
    });

    const embed = new EmbedBuilder();
    embed.setTitle("Generators Menu");
    if (channels.length == 0) {
      channels = "None";
    } else {
        channels = `**list of all vc generators:**\n${channels}`;
    }
    embed.setDescription(channels);
    let menu = await new UkMessageBuilder().build({
      rows: [
        ['generatorsMenuCreateButton', 'generatorsMenuDeleteButton', 'generatorsMenuExitButton'],
      ],
      embeds: [embed],
      client: options.client,
      guildId: options.guildId,
      channelId: options.channelId,
      userIds: options.userIds,
      Indms: options.Indms,
      data: options.data
    })
    return menu;
  },
} as menu;
