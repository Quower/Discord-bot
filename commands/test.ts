import { Client, RoleManager } from "discord.js";
import { CommandObject } from "wokcommands";
import testSchema from "../mongodb/testschema";
import mongoose from "mongoose";
let number1 = 0;

export default {
  category: "testing commands",
  description: "command for testing",

  slash: true,
  guildOnly: true,
  testOnly: true, //remove before merging to mater brach
  init: async (client: Client) => {},

  callback: async ({ client, guild, interaction }) => {
    await interaction.reply({
      content: 'test',
      ephemeral: true
    });


    /*mongoose.connection.db
      .collection("test")
      .findOne({}, async function (err, result) {
        if (err) throw err;
        if (!result) {
          new testSchema({
            number: number1,
          }).save();
          interaction.editReply(`${number1}`);
        } else {
          number1 = result.number;
          number1++;
          mongoose.connection.db
            .collection("test")
            .updateOne({}, { $set: { number: number1 } }, function (err) {
              if (err) throw err;
              interaction.editReply(`${number1}`);
            });
        }
      });*/
  },
} as CommandObject;
