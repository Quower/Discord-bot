import { Client, Events, Message } from "discord.js";
import { botOwners } from "../../index";
import menuSchema from "../models/menuSchema";
import { menusExport } from "../setup";
import { myEvent } from "../typings";
export default {
  event: Events.MessageDelete,
  execute: async (
    message, //: DiscordJS.Interaction<DiscordJS.CacheType>,
    client: Client
  ) => {
    if (message instanceof Message) {
      if (message.author.id == client.user?.id) {
        const menudb = await menuSchema.findOne({messageId: message.id})
        await menudb?.delete()
      }
    }
    
  },
} as myEvent;
