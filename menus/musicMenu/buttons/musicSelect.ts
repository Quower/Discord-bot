import { QueryType, Track } from "discord-player";
import {
  MessageActionRowComponentBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuInteraction,
} from "discord.js";
import { player } from "../../..";
import { button } from "../../../handler/typings";

export default {
  callback: async (options) => {
    if (options.interaction instanceof StringSelectMenuInteraction) {
      options.interaction.deferUpdate();
      const value = options.interaction.values[0];
      const res = await player.search(value, {
        requestedBy: options.data.searchUser,
        searchEngine: QueryType.AUTO,
      });
      let queue = await player.getQueue(options.interaction.guildId || "");
      if (queue) {
        if (res.tracks[0] instanceof Track) {
          console.log("played");
          queue.addTrack(res.tracks[0]);
          console.log(queue.playing);

          if (!queue.playing && !options.data.paused) {
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
