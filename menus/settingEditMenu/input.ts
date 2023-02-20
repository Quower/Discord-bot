import { Client } from "discord.js";
import { Menus } from "../../handler/menuhandlre";

export default async (options: {
  client: Client;
  message: string;
  data: any;
  messageId: string;
}) => {
  // options.data.newValue = options.message;
  // options.data.snewValue = options.message;   
  // Menus.update({
  //   messageId: options.messageId,
  //   client: options.client,
  //   data: options.data,
  // });
};
