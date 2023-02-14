import DiscordJS, { Client, Events, Message } from "discord.js";
import { botOwners, client } from "../../index";
import menuSchema from "../models/menuSchema";
import { menusExport } from "../setup";
import { myEvent } from "../typings";
export default {
  event: Events.MessageCreate,
  execute: async (
    message, //: DiscordJS.Interaction<DiscordJS.CacheType>,
    client: Client
  ) => {
    if (message instanceof Message) {
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
              }, 10000);
            });
          return;
        }
      }

      let run = require(`${menuobject?.path}input.ts`);
      run({client: client, message: message.content, data: menuschema.data});
    }
  },
} as myEvent;
