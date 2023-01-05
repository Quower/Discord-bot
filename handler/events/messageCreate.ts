import DiscordJS from "discord.js";
import { botOwners, client } from "../../index";
import menuSchema from "../models/menuSchema";
import { menusExport } from "../setup";
export default async function (message: DiscordJS.Message<boolean>) {
  if (client == undefined || message == undefined) {
    console.log("no client or interaction");
    return;
  }
  let menuschema = await menuSchema.findOne({
    channelId: message.channel.id,
    waitingForResponse: true,
  });
  let menuobject = (await menusExport).find(
    (menu) => menu.name == menuschema?.currentMenu
  );
  if (menuschema == undefined) {
    console.log("no menuschema");
    return;
  }
  if (menuschema.userIds instanceof Array<String>) {
    const userIds: Array<String> = menuschema.userIds;
    if (
      userIds.includes(message.member?.id || "") == false &&
      botOwners.includes(message.member?.id || "") == false
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
  run(client, message, menuSchema);
}
