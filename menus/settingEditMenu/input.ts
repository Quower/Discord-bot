import { Client, Message, SelectMenuInteraction } from "discord.js";
import SettingsHandler from "../../handler/funtions";
import { Menus } from "../../handler/menuhandlre";
import menuSchema from "../../handler/models/menuSchema";

export default async (options: {
  client: Client;
  message: string;
  data: any;
  messageId: string;
}) => {
  options.data.newValue = options.message
  Menus.update({
    messageId: options.messageId,
    client: options.client,
    data: options.data
  });
};
