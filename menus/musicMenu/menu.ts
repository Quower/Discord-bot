import { QueryType } from "discord-player";
import { BaseMessageOptions, EmbedBuilder } from "discord.js";
import { player } from "../..";
import { UkMessageBuilder } from "../../handler/setup";
import { menu } from "../../handler/typings";

export default {
  create: async (options): Promise<BaseMessageOptions> => {
    switch (options.data.action) {
      case "search":
        const res = await player.search(options.data.lastInput, {
          requestedBy: options.data.searchUser,
          searchEngine: QueryType.AUTO,
        });
        if (!res || !res.tracks.length) {
          options.data.result = `No results found <@${options.data.searchUser}>... try again ? ❌`;
        } else {
          const sliced = res.tracks.slice(0, 5);
          options.data.result = [];
          sliced.forEach((result) => {
            options.data.result.push({
              title: result.title,
              author: result.author,
              duration: result.duration,
              url: result.url,
            });
          });
        }
        break;
    }
    options.data.action = "none";
    const embed = new EmbedBuilder();
    embed.setTitle("Music Menu");
    if (options.data.result) {
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
    }

    let row3 = [];
    if (options.waitingForResponse == false) {
      row3.push("InputButton");
    }

    let row1 = ["musicJoinButton"];
    const queue = player.getQueue(options.guildId || "");
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
      if (queue.current) {
        const track = queue.current;

        const methods = ["disabled", "track", "queue"];

        const trackDuration = track.duration;

        embed.spliceFields(0, 0, {
          name: "Now Playing",
          value: `${"``"}${
            track.title
          }${"``"}\nDuration **${trackDuration}**\nLoop mode **${
            methods[queue.repeatMode]
          }**\nRequested by ${track.requestedBy}`,
        });
        embed.setThumbnail(track.thumbnail);
        if (queue.tracks[0]) {
          const songs = queue.tracks.length;

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
        } else {
          embed.spliceFields(1, 0, {
            name: "Next",
            value: "none",
          });
        }
      } else {
        embed.spliceFields(0, 0, {
          name: "Now Playing",
          value: "No music currently playing",
        });
      }

      options.data.queue = queue;

      if (options.data.result) {
        const menu = await new UkMessageBuilder().build(options, {
          rows: [["musicSelect"], row1, row3],
          embeds: [embed],
        });
        options.data.queue = undefined;
        return menu;
      }
    }
    embed.setDescription("cool description");

    const menu = await new UkMessageBuilder().build(options, {
      rows: [row1, row3],
      embeds: [embed],
    });
    options.data.queue = undefined;
    return menu;
  },
} as menu;
