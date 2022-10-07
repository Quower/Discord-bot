import { Client, RoleManager } from "discord.js";
import { ICommand } from "wokcommands";
import testSchema from '../mongodb/testschema'
import mongoose from "mongoose"
let number1 = 0

export default {
    category: 'testing commands',
    description: 'command for testing',

    slash: true,
    guildOnly: true,
    testOnly: true,//remove before merging to mater brach
    init: async (client: Client) => { 

    },

    callback: async ({client, guild}) => {

      
      


      mongoose.connection.db.collection('test').findOne({}, async function(err, result) {
        if (err) throw err;
        if (!result) {
          await new testSchema({
            number: number1
          }).save()
        } else {
          number1 = result.number
          number1++
          mongoose.connection.db.collection('test').updateOne({}, { $set: {number: number1} }, function(err) {
            if (err) throw err;
          })

        }
      })
      

      return `${number1}`

    },
} as ICommand