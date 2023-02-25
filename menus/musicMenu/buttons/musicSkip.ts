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

export default {
  callback: async (options) => {
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
        options.interaction.deferUpdate();

        let queue = player.getQueue(options.interaction.guildId || "");
        if (queue) {
          //queue.
          queue.forceNext();
        }
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
    return new ButtonBuilder().setLabel("Skip").setStyle(ButtonStyle.Primary);
  },
} as button;
