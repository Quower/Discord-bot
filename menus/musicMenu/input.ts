import { Client, Message } from "discord.js";
import { Menus } from "../../handler/menuhandlre";

export default async (options: {
  client: Client;
  message: Message;
  data: any;
  messageId: string;
}) => {
  console.log("got to input");
  options.data.lastInput = options.message.content;
  options.data.action = "search";
  options.data.searchUser = options.message.member?.id;

  Menus.update({
    messageId: options.messageId,
    client: options.client,
    data: options.data,
  });
};
