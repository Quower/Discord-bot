import {
  BaseGuildTextChannel,
  BaseGuildVoiceChannel,
  Channel,
  Client,
  GuildChannel,
  MessageEmbed,
  RoleManager,
} from "discord.js";
import { isBreakStatement } from "typescript";
import { ICommand } from "wokcommands";
import generatorSchema from "../mongodb/generator";
import mongoose from "mongoose";
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
            console.log(channel.id);
            await new generatorSchema({
              chanelId: channel.id,
              guildId: channel.guildId,
            }).save();
            interaction.editReply({
              content: `created a vc generator: `,
            });
          });
        break;
      case "delete":
        console.log("ran command delete");
        interaction.editReply({
          content: "command not finished",
        });
        break;
      case "list":
        let channels = "";
        mongoose.connection.db
          .collection("generators")
          .find({})
          .toArray(async function (err, result) {
            if (err) throw err;
            await result?.forEach(async (generator) => {
              if ((generator.guildId = guild!.id)) {
                await client.channels
                  .fetch(generator.chanelId)
                  .then(channel => {
                    channels = `${channels}• ${channel}\n`;
                  }, () => {
                    channels = `${channels}• #deleted-channel\n`;
                  })               
                /*let embed = new MessageEmbed();
                embed.title = "Generators";
                embed.description = channels;
                interaction.editReply({
                  embeds: [embed],
                });*/
              }
            });
            let embed = new MessageEmbed();
            embed.title = "Generators";
            embed.description = channels;
            interaction.editReply({
              embeds: [embed],
            });
          });

        break;
    }

    /*mongoose.connection.db.collection('test').findOne({}, async function(err, result) {
        if (err) throw err;
        if (!result) {
          new testSchema({
            number: number1
          }).save()
          interaction.editReply(`${number1}`)
          
        
        } else {
          number1 = result.number
          number1++
          mongoose.connection.db.collection('test').updateOne({}, { $set: {number: number1} }, function(err) {
            if (err) throw err;
            interaction.editReply(`${number1}`)
          })

        }
      })*/
  },
} as ICommand;
