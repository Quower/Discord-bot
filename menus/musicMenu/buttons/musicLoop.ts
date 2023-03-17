import {
  ButtonBuilder,
  ButtonInteraction,
  ButtonStyle,
  Client,
  GuildMember,
  InteractionCollector,
  MessageActionRowComponentBuilder,
  PermissionFlagsBits,
  PermissionsBitField,
} from "discord.js";
import { button } from "../../../handler/typings";
import { Menus } from "../../../handler/menuhandlre";
import { botOwners, player } from "../../..";
import SettingsHandler from "../../../handler/settingshandler";
import menuSchema from "../../../handler/models/menuSchema";
import { musicUpdate } from "../events/ready";
import { QueueRepeatMode } from "discord-player";
export default {
  callback: async (options) => {
    //options.data.paused = !options.data.paused;

    const settings = new SettingsHandler();
    await settings.init({
      client: options.client,
      guildId: options.interaction.guildId || "",
    });
    const djroleId = await settings.read({
      settingName: "djrole",
      retunrAs: "raw",
    });

    if (options.interaction.member instanceof GuildMember) {
      if (
        options.interaction.member?.roles.cache.some(
          (role) => role.id == djroleId
        ) ||
        options.interaction.member?.permissions.has("Administrator") ||
        botOwners.includes(options.interaction.user.id)
      ) {
        let queue = await player.nodes.get(options.interaction.guildId || "");
        if (queue?.repeatMode == 2) {
          queue.setRepeatMode(1);
        } else if (queue?.repeatMode == 1) {
          queue.setRepeatMode(0);
        } else if (queue?.repeatMode == 0) {
          queue.setRepeatMode(2);
        }
        await musicUpdate(options.interaction.guild?.id, options.client);
        options.interaction.deferUpdate()
      } else {
        await options.interaction.reply({
          content:
            "You don't have the reqiered permission to perform this action",
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
    const button = new ButtonBuilder();
    button.setStyle(ButtonStyle.Primary);
    if (options.data.queue.repeatMode == 2) {
      button.setEmoji("1079442523803615342");
    } else if (options.data.queue.repeatMode == 1) {
      button.setEmoji("1079442526345367683");
    } else {
      button.setEmoji("1079444755286593627");
    }
    if (!options.data.queue.current) {
      button.setDisabled(true);
    }
    return button;
  },
} as button;
