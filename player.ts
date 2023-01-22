import { Player } from "discord-player";
import { client } from "./index";

export const player = new Player(client);

player.on("trackStart", (queue, track) => {
  //queue.metadata.channel.send(`🎶 | Now playing **${track.title}**!`);
});
