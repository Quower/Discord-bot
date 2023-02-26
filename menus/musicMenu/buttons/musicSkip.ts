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
           await queue.skip();
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
    const button = new ButtonBuilder();
    button.setStyle(ButtonStyle.Primary).setEmoji("1079331777807654912");
    if (!options.data.queue.current) {
      button.setDisabled(true);
    }
    return button;
  },
} as button;
