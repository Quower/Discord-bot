import { QueryType, Track } from "discord-player";
import { BaseMessageOptions, Client, EmbedBuilder } from "discord.js";
import { player } from "../..";
import { settingcategorys } from "../../handler/events/ready";
import SettingsHandler from "../../handler/settingshandler";
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
          options.data.result = res.tracks.slice(0, 5);
          //options.data.result;
          //res.tracks[1].
          /*options.data.result = `${maxTracks
            .map((track, i) => `**${i + 1}**. ${track.title} | ${track.author}`)
            .join("\n")}⬇️`;*/
        }
        break;
    }
    options.data.action = "none";
    const settings = new SettingsHandler();
    await settings.init({
      client: options.client,
      guildId: options.guildId || "",
    });
    let row2 = ["exitButton"];
    const messageinput = await settings.read({
      settingName: "musicMessageInput",
      retunrAs: "raw",
    });
    const forceInput = await settings.read({
      settingName: "musicForceInput",
      retunrAs: "raw",
    });
    if (messageinput == true && forceInput == false) {
      row2.push("InputButton");
    }
    const embed = new EmbedBuilder();
    embed.setTitle("Music Menu");
    if (options.data.result) {
      const resultText = `${options.data.result
        .map(
          (track: Track, i: number) =>
            `**${i + 1}**. ${track.title} | ${track.author}`
        )
        .join("\n")}⬇️`;
      embed.addFields({
        name: "Search results",
        value: `${"``"}${
          options.data.lastInput || "none"
        }${"``"}\n${resultText}`,
      });
    }
    embed.setDescription("description");

    let row1 = ["musicJoinButton"];
    const queue = player.getQueue(options.guildId || "");
    if (queue) {
      row1 = ["musicLeaveButton", "musicSkip"];
      console.log(queue.tracks);
      console.log("got to place");
      if (queue.current) {
        const track = queue.current;

        const methods = ["disabled", "track", "queue"];

        //const timestamp = queue.getPlayerTimestamp();

        const trackDuration = track.duration;

        //const progress = queue.createProgressBar();
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
              `**${i + 1}** - ${track.title} | ${
                track.author
              } (requested by : ${track.requestedBy.username})`
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

      if (options.data.result) {
        const menu = await new UkMessageBuilder().build(options, {
          rows: [["musicSelect"], row1, row2],
          embeds: [embed],
        });
        return menu;
      }
    }
    const menu = await new UkMessageBuilder().build(options, {
      rows: [row1, row2],
      embeds: [embed],
    });
    return menu;
  },
} as menu;
