import { BaseMessageOptions, Client, EmbedBuilder } from "discord.js";
import { UkMessageBuilder } from "../../handler/setup";
import { menu } from "../../handler/typings";
import generatorSchema from "../../commanddirs/generators/models/generatorSchema";

export default {
  create: async (options): Promise<BaseMessageOptions> => {
    // const embed = new EmbedBuilder();
    // embed.setTitle("Delete Vc generator!");
    // embed.setDescription(
    //   "Menu for doing stuff for vc generators"
    // );
    let time = Date.now();

    let channels: string = "";
    await (
      await generatorSchema.find({ guildId: options.guildId })
    ).forEach((generator) => {
      channels = `${channels}• <#${generator.channelId}>\n`;
    });
    console.log(`got to generatorsMenu point 1:${Date.now() - time}`);
    time = Date.now();

    const embed = new EmbedBuilder();
    embed.setTitle("Generators Menu");
    if (channels.length == 0) {
      channels = "None";
    } else {
      channels = `**list of all vc generators:**\n${channels}`;
    }
    embed.setDescription(channels);
    console.log(`got to generatorsMenu point 2:${Date.now() - time}`);
    time = Date.now();
    let menu = await new UkMessageBuilder().build(options, {
      rows: [
        [
          "generatorsMenuCreateButton",
          "generatorsMenuDeleteButton",
          "exitButton",
        ],
      ],
      embeds: [embed],
    });
    console.log(`got to generatorsMenu point 3:${Date.now() - time}`);
    time = Date.now();
    return menu;
  },
} as menu;
