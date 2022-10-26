import {
  BaseGuildTextChannel,
  BaseGuildVoiceChannel,
  Channel,
  Client,
  GuildChannel,
  MessageEmbed,
  RoleManager,
  MessageActionRow,
  MessageSelectMenu,
  MessageButton,
} from "discord.js";
import { isBreakStatement } from "typescript";
import { Select_Generator } from "../functions/generator_selector"
import { ICommand } from "wokcommands";
import generatorSchema from "../mongodb/generator";
import mongoose from "mongoose";
import { MessageButtonStyles } from "discord.js/typings/enums";
let number1 = 0;

export default {
  category: "testing commands",
  description: "command for testing",

  slash: true,
  guildOnly: true,
  ownerOnly: true,
  testOnly: true, //remove before merging to mater brach
  permissions: ["ADMINISTRATOR"],
  options: [
    {
      name: "create",
      type: "SUB_COMMAND",
      description: "create a vc generator",
      options: [
        {
          name: "name",
          description: "name for the generated vc",
          type: "STRING",
          required: true,
        },
      ],
    },
    {
      name: "delete",
      type: "SUB_COMMAND",
      description: "delete a vc generator",
    },
    {
      name: "list",
      type: "SUB_COMMAND",
      description: "list all vc generators",
    },
  ],
  init: async (client: Client) => {},

  callback: async ({ client, guild, interaction }) => {
    const options = interaction.options;
    await interaction.deferReply({
      ephemeral: true,
    });

    switch (options.getSubcommand()) {
      case "create":
        guild?.channels
          .create(interaction.options.getString("name") || "name not inputed", {
            type: "GUILD_VOICE",
          })
          .then(async (channel) => {
            await new generatorSchema({
              channelId: channel.id,
              guildId: channel.guildId,
            }).save();
            interaction.editReply({
              content: `created a vc generator: <#${channel.id}>`,
            });
          });
        break;
      case "delete":
        const generators = mongoose.connection.db
          .collection("generators")
          .find({ guildId: guild!.id })
        const row = await Select_Generator(guild, 'deletechannel', 1, 1, client)
        const row2 = new MessageActionRow();
        row2.addComponents(
          new MessageButton()
          .setCustomId('deletechannelcancel')
          .setLabel('Cancel')
          .setStyle(MessageButtonStyles.SECONDARY)
        )
        const embed2 = new MessageEmbed();
        embed2.title = ":loud_sound: Delete generator"
        interaction.editReply({
          embeds: [embed2],
          components: [row, row2]
    })
        
        break;
      case "list":
        let channels = "";
        await mongoose.connection.db
          .collection("generators")
          .find({ guildId: guild!.id })
          .forEach((generator) => {
            channels = `${channels}• <#${generator.channelId}>\n`;
          });
        
        const embed = new MessageEmbed();
        embed.title = "Generators";
        if (channels.length == 0) {
          channels = "None";
        }
        embed.description = channels;
        interaction.editReply({
          embeds: [embed],
        });
        break;
    }
  },
} as ICommand;
