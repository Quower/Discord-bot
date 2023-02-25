import { Client, Events, Message } from "discord.js";
import { botOwners } from "../../index";
import menuSchema from "../models/menuSchema";
import { menusExport } from "../setup";
import { myEvent } from "../typings";
export default {
  event: Events.MessageCreate,
  execute: async (
    message, //: DiscordJS.Interaction<DiscordJS.CacheType>,
    client: Client
  ) => {
    if (message instanceof Message && message.author.id != client.user?.id) {
      let menuschema = await menuSchema.findOne({
        channelId: message.channel.id,
        waitingForResponse: true,
      });
      let menuobject = (await menusExport).find(
        (menu) => menu.name == menuschema?.currentMenu
      );
      if (menuschema == undefined) {
        //console.log("no menuschema");
        return;
      }
      if (menuschema.userIds.length > 0) {
        const userIds: Array<String> = menuschema.userIds;
        if (
          userIds.includes(message.member?.id || "") == false ||
          botOwners.includes(message.member?.id || "") == false ||
          message.member?.id != message.guild?.ownerId
        ) {
          message
            .reply({
              content: "You are not permitted to interact with this menu",
            })
            .then((reply) => {
              setTimeout(() => {
                reply.delete();
                message.delete();
              }, 3000);
            });
          return;
        }
      }
      try {
        message.delete()
      } catch (e) {
        console.log("couldn't delete input message")
      }

      let run = require(`../.${menuobject?.path}input.ts`).default;
      run({
        client: client,
        message: message,
        data: menuschema.data,
        messageId: menuschema.messageId,
      });
    }
  },
} as myEvent;
