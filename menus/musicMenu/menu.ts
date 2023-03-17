import { QueryType, Track } from "discord-player";
import { BaseMessageOptions, Client, EmbedBuilder } from "discord.js";
import { player } from "../..";
import { UkMessageBuilder } from "../../handler/setup";
import { menu } from "../../handler/typings";
import { savedResult } from "./typings";
let savedResults: savedResult[] = [];

export default {
  create: async (options): Promise<BaseMessageOptions> => {
    // switch (options.data.action) {
    //   case "search":
    const index = savedResults.findIndex(
      (res) => res.menuId == options.model?.id
    );
    //options.model.id
    // console.log("index:")
    // console.log(index)
    if (index == -1) {
      options.data.result == undefined;
    } else if (savedResults[index].search == options.data.lastInput) {
      options.data.result = savedResults[index].result;
    } else {
      options.data.result == undefined;
    }
    if (!options.data.result) {
      const res = await player.search(options.data.lastInput, {
        requestedBy: options.data.searchUser,
        searchEngine: QueryType.AUTO,
      });
      if (!res || !res.tracks.length) {
        options.data.result = `No results found <@${options.data.searchUser}>... try again ? ❌`;
      } else {
        options.data.result = res.tracks.slice(0, 5);
        if (index == -1) {
          savedResults.push({
            search: options.data.lastInput,
            menuId: options.model?.id,
            result: options.data.result,
          });
        } else {
          savedResults[index].result = options.data.result;
        }
      }
    }
    console.log(options.data.result);
    const embed = new EmbedBuilder();
    embed.setTitle("Music Menu");
    if (options.data.result instanceof Array<Track>) {
      const resultText = `${options.data.result
        .map(
          (track: any, i: number) =>
            `**${i + 1}**. ${track.title} | ${track.author}\n ${track.duration}`
        )
        .join("\n")}⬇️`;
      embed.addFields({
        name: "Search results",
        value: `${"``"}${
          options.data.lastInput || "none"
        }${"``"}\n${resultText}`,
      });
    } else if (options.data.result instanceof String) {
      embed.addFields({
        name: "Search results",
        value: options.data.result
      });

    }
    //embed.setDescription("description");

    let row3 = [];
    if (options.waitingForResponse == false) {
      row3.push("InputButton");
    }

    let row1 = ["musicJoinButton"];
    const queue = player.nodes.get(options.guildId || "");
    if (queue) {
      row1 = [
        "musicLeaveButton",
        "musicPreveous",
        "musicPause",
        "musicSkip",
        "musicLoop",
      ];
      console.log(queue.tracks);
      console.log("got to place");
      if (queue.currentTrack) {
        const track = queue.currentTrack;

        const trackDuration = track.duration;

        // if (queue != "idle") {
        //   embed.spliceFields(0, 0, {
        //     name: "Now Playing",
        //     value: `${"``"}${
        //       track.title
        //     }${"``"}\nDuration **${trackDuration}**\nStatus **${
        //       queue.connection.status
        //     }**\nRequested by ${track.requestedBy}`,
        //   });
        //   embed.setThumbnail(track.thumbnail);
        // } else {
        //   embed.spliceFields(0, 0, {
        //     name: "Now Playing",
        //     value: "No music currently playing",
        //   });
        // }
      } else {
        embed.spliceFields(0, 0, {
          name: "Now Playing",
          value: "No music currently playing",
        });
      }

      if (queue.tracks.size > 0) {
        const songs = queue.tracks.size;

        const nextSongs =
          songs > 5
            ? `And **${songs - 5}** other song(s)...`
            : `In the playlist **${songs}** song(s)...`;

        const tracks = queue.tracks.map(
          (track, i) =>
            `**${i + 1}**. ${track.title} | ${track.author}\n ${
              track.duration
            } (requested by : ${track.requestedBy})`
        );
        embed.spliceFields(1, 0, {
          name: "Next",
          value: `${tracks.slice(0, 5).join("\n")}\n\n${nextSongs}`,
        });
      }

      options.data.queue = queue;

      if (options.data.result) {
        const menu = await new UkMessageBuilder().build(options, {
          rows: [["musicSelect"], row1, row3],
          embeds: [embed],
        });
        options.data.queue = undefined;
        options.data.result = undefined;
        return menu;
      }
    }
    embed.setDescription("cool description");

    const menu = await new UkMessageBuilder().build(options, {
      rows: [row1, row3],
      embeds: [embed],
    });
    options.data.queue = undefined;
    options.data.result = undefined;
    return menu;
  },
} as menu;

export async function findTrack(
  trackUrl: string,
  menuId: string
): Promise<Track | void> {
  const index = savedResults.findIndex((res) => res.menuId == menuId);
  if (index == -1) {
    return;
  }
  return savedResults[index].result.find((res) => res.url == trackUrl);
}
