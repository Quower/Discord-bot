import { DMChannel, TextChannel } from "discord.js";
import { ICommand } from "wokcommands";
export default {
    category: 'message stuff',
    description: 'clears messages',
 
    slash: true,
    guildOnly: true,
    options: [
        {
          name: 'number',
          description: 'Number of messages to delete',
          required: true,
          type: 'INTEGER',
          maxValue: 100,
          minValue: 2,
        },
      ],
    permissions: ['ADMINISTRATOR'],

    callback: async ({interaction}) => {

      let channel = interaction.channel 
      let number = interaction.options.getInteger('number')

      if (channel instanceof TextChannel) {
        if (number) 
        await channel.bulkDelete(number, true).then( deletedMessages => {
          interaction.reply({
            content: `Deleted ${deletedMessages.size} messages.`,
            ephemeral: true,
          })
        })
      }
    },
} as ICommand