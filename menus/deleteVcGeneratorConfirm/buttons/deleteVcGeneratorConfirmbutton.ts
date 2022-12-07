import { ButtonStyle, ChatInputCommandInteraction, Client } from "discord.js";
import { button } from "../../../handler/typings";

export default {
  label: "Cancel",
  style: ButtonStyle.Secondary,
  callback: async (
    client: Client,
    interaction: ChatInputCommandInteraction,
  ) => {
    //code
    
  },
} as button;