import { QueryType, Track } from "discord-player";
import {
  AnySelectMenuInteraction,
  ButtonBuilder,
  ButtonStyle,
  Client,
  Interaction,
  InteractionCollector,
  MessageActionRowComponentBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuInteraction,
} from "discord.js";
import { player } from "../../..";
import { Menus } from "../../../handler/menuhandlre";
import menuSchema from "../../../handler/models/menuSchema";
import { button } from "../../../handler/typings";
import { findTrack } from "../menu";

export default {
  callback: async (options) => {
    if (options.interaction instanceof StringSelectMenuInteraction) {
      options.interaction.deferUpdate();
      // const res = await player.search(options.interaction.values[0], {
      //     requestedBy: options.data.searchUser,
      //     searchEngine: QueryType.
      // });
      const value = options.interaction.values[0];
      //console.log(options.data.result);

      //const result = options.data.result.find((res: any) => res.id == value);
      //player.
      // const res = await player.search(value, {
      //   requestedBy: options.data.searchUser,
      //   searchEngine: QueryType.AUTO,
      // });
      const track = await findTrack(value, options.model?.id);
      console.log(track)
      if (track) {
        let queue = await player.getQueue(options.interaction.guildId || "");
        if (queue) {
          console.log("played");
          queue.addTrack(track);
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
    //   if (options.data.settingdata.length < 1) {
    //     const button = new ButtonBuilder();
    //     button
    //       .setDisabled(true)
    //       .setLabel("something went wrong")
    //       .setStyle(ButtonStyle.Secondary);
    //     return button;
    //   }
    //console.log(options.data.result);

    options.data.result.forEach((resu: any) => {
      //if (resu instanceof Track) {resu.url}
      selectMenu.addOptions([
        {
          label: resu.title.substring(0, 99),
          value: resu.id,
          description: resu.duration,
        },
      ]);
      //}
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
    // selectMenu.addOptions([
    //   {
    //     label: "none",
    //     value: "none",
    //     description: "none",
    //   },
    // ]);

    return selectMenu;
  },
} as button;
