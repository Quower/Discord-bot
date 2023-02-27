import {
  ButtonBuilder,
  ButtonStyle,
  Client,
  GuildMember,
  MessageActionRowComponentBuilder,
} from "discord.js";
import { button } from "../../../handler/typings";
import { botOwners, player } from "../../..";
import SettingsHandler from "../../../handler/settingshandler";
import { musicUpdate } from "../events/ready";

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
        let queue = await player.getQueue(options.interaction.guildId || "");
        queue?.setPaused(!queue.connection.paused);
        await musicUpdate(options.interaction.guild?.id, options.client);
        options.interaction.deferUpdate();
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
    if (options.data.queue.connection.paused) {
      button.setEmoji("1079331779191767111");
    } else if (!options.data.queue.current) {
      button.setEmoji("1079331779191767111").setDisabled(true);
    } else {
      button.setEmoji("1079331782425595955");
    }
    return button;
  },
} as button;
