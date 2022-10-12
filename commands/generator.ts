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
    ownerOnly: true,
    testOnly: true,//remove before merging to mater brach
    permissions: ['ADMINISTRATOR'],
    options: [
        {
            name: 'create',
            type: 'SUB_COMMAND',
            description: 'create vc generator'
        },
        {
            name: 'delete',
            type: 'SUB_COMMAND',
            description: 'delete vc generator'
        }
    ],
    init: async (client: Client) => { 

    },

    callback: async ({client, guild, interaction}) => {
        const options = interaction.options
      await interaction.reply('test')

      switch (options.getSubcommand()) {
        case 'create':
            guild?.channels.create('test', {
                type: 'GUILD_TEXT'
            })
            break;
        case 'delete':
            console.log("It is a Monday.");
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
} as ICommand