import { Client, Events, Message } from "discord.js";
import menuSchema from "../models/menuSchema";
import { myEvent } from "../typings";
export default {
  event: Events.MessageBulkDelete,
  execute: async (messages, client: Client) => {
    messages.forEach(async (msg: Message) => {
      if (msg.author.id == client.user?.id) {
        const menudb = await menuSchema.findOne({ messageId: msg.id });
        await menudb?.delete();
      }
    });
  },
} as myEvent;
