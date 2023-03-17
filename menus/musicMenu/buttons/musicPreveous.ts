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
          queue?.history.back()
          //await musicUpdate(options.interaction.guild?.id, options.client);
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
      console.log(options.data.queue.previousTracks)
      if (!options.data.queue.current) {
        return new ButtonBuilder()
          .setEmoji("1079331775358181396")
          .setStyle(ButtonStyle.Primary)
          .setDisabled(true)
      } else {
        return new ButtonBuilder()
          .setEmoji("1079331775358181396")
          .setStyle(ButtonStyle.Primary)
      }
    },
  } as button;
  