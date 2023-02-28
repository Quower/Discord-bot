import { QueryType, Track } from "discord-player";
import {
  MessageActionRowComponentBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuInteraction,
} from "discord.js";
import { player } from "../../..";
import { button } from "../../../handler/typings";
import { findTrack } from "../menu";

export default {
  callback: async (options) => {
    if (options.interaction instanceof StringSelectMenuInteraction) {
      options.interaction.deferUpdate();
      const value = options.interaction.values[0];
      const track = await findTrack(value, options.model?.id);
      console.log(track)
      if (track) {
        let queue = await player.getQueue(options.interaction.guildId || "");
        if (queue) {
          console.log("played");
          queue.addTrack(track);
          console.log(queue.playing);

          if (!queue.playing) {
            await queue.play();
          }
        }
      }
    }
  },
  create: async (options): Promise<MessageActionRowComponentBuilder> => {
    const selectMenu = new StringSelectMenuBuilder()
      .setMaxValues(1)
      .setMinValues(1)
      .setPlaceholder("Select song");

    options.data.result.forEach((resu: any) => {
      selectMenu.addOptions([
        {
          label: resu.title.substring(0, 99),
          value: resu.url,
          description: resu.duration,
        },
      ]);
    });
    if (selectMenu.options.length < 1) {
      selectMenu.addOptions([
        {
          label: "error",
          value: "error",
          description: "error",
        },
      ]);
    }

    return selectMenu;
  },
} as button;
