import {
  ButtonBuilder,
  ButtonInteraction,
  ButtonStyle,
  Client,
  GuildMember,
  InteractionCollector,
  MessageActionRowComponentBuilder,
} from "discord.js";
import { button } from "../../../handler/typings";
import { Menus } from "../../../handler/menuhandlre";
import { player } from "../../..";
import menuSchema from "../../../handler/models/menuSchema";
import { musicUpdate } from "../events/ready";

export default {
  callback: async (options) => {
    //options.interaction.deferUpdate();
    if (options.interaction.member instanceof GuildMember) {
      if (options.interaction.member?.voice.channelId) {
        console.log("perse")
        options.interaction.deferUpdate();
        const queue = player.createQueue(options.interaction.guild || "", {leaveOnEnd: false});
        await queue.connect(options.interaction.member?.voice.channel || "");
        musicUpdate(options.interaction.guild?.id, options.client);
      } else {
        await options.interaction.reply({
          content: "You are not in a voice channel!",
          ephemeral: true,
        });
      }
    }
  },
  create: async (options: {
    client: Client;
    guildId?: String;
    channelId: String;
    userIds: String[];
    Indms: Boolean;
    data?: any;
    waitingForResponse: boolean;
  }): Promise<MessageActionRowComponentBuilder> => {
    return new ButtonBuilder().setLabel("Join").setStyle(ButtonStyle.Primary);
  },
} as button;
