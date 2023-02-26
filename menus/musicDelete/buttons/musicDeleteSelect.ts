import {
  ButtonBuilder,
  ButtonStyle,
  Client,
  MessageActionRowComponentBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuInteraction,
  TextBasedChannelMixin,
  TextChannel,
} from "discord.js";
import { Menus } from "../../../handler/menuhandlre";
import { button } from "../../../handler/typings";

export default {
  callback: async (options) => {
    if (options.interaction instanceof StringSelectMenuInteraction) {
      options.interaction.deferUpdate();
      options.data.selected = options.interaction.values;
      console.log(options.interaction.values.length);
      if (options.interaction.values.length < 1) {
        options.data.selectm = false;
      } else {
        options.data.selectm = true;
      }
      Menus.update({
        messageId: options.interaction.message.id,
        client: options.client,
        data: options.data,
      });
    }
  },
  create: async (options): Promise<MessageActionRowComponentBuilder> => {
    const selectMenu = new StringSelectMenuBuilder()
      .setMaxValues(options.data.result.length)
      .setMinValues(0)
      .setPlaceholder("Nothing Selected");
    console.log(options.data.result);
    let i = 0
    for (const res of options.data.result) {
      i++
      try {
        const channel = await options.client.channels.fetch(res.channelId);
        if (channel instanceof TextChannel) {
          selectMenu.addOptions([
            {
              label: `${i}`,
              value: res.messageId,
              description: `#${channel?.name}`,
              default: options.data.selected.includes(res.messageId),
            },
          ]);
        }
      } catch (e) {
        console.log("got errior");
        selectMenu.addOptions([
          {
            label: `${i}`,
            value: res.messageId,
            description: "#deleted-channel",
            default: options.data.selected.includes(res.messageId),
          },
        ]);
      }
    }

    //cos

    console.log(selectMenu);
    //options.data.result.forEach((res: any) => {});

    return selectMenu;
  },
} as button;
