import { Queue } from "discord-player";
import { Client } from "discord.js";
import { player } from "../../..";
import { Menus } from "../../../handler/menuhandlre";
import menuSchema from "../../../handler/models/menuSchema";
import { readyEvent } from "../../../handler/typings";

export default {
  async execute(client) {
    const menudb = await menuSchema.find({
      currentMenu: "musicMenu",
    });
    menudb.forEach((menu) => {
      Menus.update({
        messageId: menu.messageId || "",
        client: client,
      });
    });
    player.on("botDisconnect", async (queue) => {
      queue.destroy();
      musicUpdate(queue.guild.id, client);
    });
    player.on("trackStart", async (queue) => {
      musicUpdate(queue.guild.id, client);
    });
    // player.on("trackEnd", async (queue) => {
    //   musicUpdate(queue.guild.id, client);
    // });
    player.on("trackAdd", async (queue) => {
      musicUpdate(queue.guild.id, client);
    });
    player.on("queueEnd", async (queue) => {
      musicUpdate(queue.guild.id, client);
    });
    player.on("error", async (queue, e) => {
      
      console.log(e)
    });
    player.on("debug", async (queue, e) => {
      
      console.log(e)
    });
    player.on("connectionError", async (queue, e) => {
      console.log(e)
    });
    // player.on("voiceStateUpdate", async (queue) => {
    //   musicUpdate(queue, client);
    // });
  },
} as readyEvent;

export async function musicUpdate(guildId: String | undefined, client: Client) {
  const menudb = await menuSchema.find({
    guildId: guildId,
    currentMenu: "musicMenu",
  });
  menudb.forEach(async (menu) => {
    if (menu) {
    Menus.update({
      model: menu,
      client: client,
    });}
  });
}
