import { Client, Events, Message } from "discord.js";
import { botOwners } from "../../index";
import menuSchema from "../models/menuSchema";
import { menusExport } from "../setup";
import { myEvent } from "../typings";
export default {
  event: Events.MessageBulkDelete,
  execute: async (
    messages, //: DiscordJS.Interaction<DiscordJS.CacheType>,
    client: Client
  ) => {
    //if (messages instanceof Array<Message>) {
    messages.forEach(async (msg: Message) => {
      if (msg.author.id == client.user?.id) {
        const menudb = await menuSchema.findOne({ messageId: msg.id });
        await menudb?.delete();
      }
    });
    //}
  },
} as myEvent;
