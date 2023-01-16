import { BaseMessageOptions, ChatInputCommandInteraction, Client, EmbedBuilder } from "discord.js";
import Handler, { UkMessageBuilder } from "../../handler/setup";
import { menu } from "../../handler/typings";

export default {
  create: async (
    options: {
      client: Client;
      waitingForResponse: boolean;
      guildId?: String;
      channelId?: String;
      userIds?: String[];
      Indms?: Boolean;
      data?: any
    }
  ):Promise<BaseMessageOptions> => {
    console.log(`${options.data}    hhhh`)
    const embed = new EmbedBuilder();
    embed.setTitle("Delete Vc generator!");
    embed.setDescription(`Are you sure you want to delete a vc generator: <#${options.data}>`);

    let menu = await new UkMessageBuilder().build({
      content: 'weed',
      rows: [['deleteVcGeneratorConfirmbutton','deleteVcGeneratorCancelbutton']],
      embeds: [embed],
      client: options.client,
      guildId: options.guildId,
      channelId: options.channelId,
      userIds: options.userIds,
      Indms: options.Indms,
      data: options.data

    })
    return menu
    
  },
} as menu;
