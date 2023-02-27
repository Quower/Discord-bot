import { Client, Events, Message } from "discord.js";
import menuSchema from "../models/menuSchema";
import { myEvent } from "../typings";
export default {
  event: Events.MessageDelete,
  execute: async (message, client: Client) => {
    if (message instanceof Message) {
      if (message.author.id == client.user?.id) {
        const menudb = await menuSchema.findOne({ messageId: message.id });
        await menudb?.delete();
      }
    }
  },
} as myEvent;
