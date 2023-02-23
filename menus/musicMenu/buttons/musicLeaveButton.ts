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
        options.interaction.deferUpdate()
        player.deleteQueue(options.interaction.guild || "");
        Menus.update({
          messageId: options.interaction.message.id,
          client: options.client,
        });
      } else {
        await options.interaction.reply({
          content:
            "You don't have the reqiered permission to perform this action",
          ephemeral: true,
        });
      }
      //     if (options.interaction.member?.voice) {
      //       const queue = player.createQueue(options.interaction.guild || '', {})
      //       await queue.connect(options.interaction.member?.voice.channel || '');
      //       Menus.update({
      //         messageId: options.interaction.message.id,
      //         client: options.client,
      //       });
      //     } else {
      //       await options.interaction.reply({
      //         content: "You are not in a voice channel!",
      //         ephemeral: true,
      //       });
      //     }
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
    return new ButtonBuilder().setLabel("Leave").setStyle(ButtonStyle.Danger);
  },
} as button;
