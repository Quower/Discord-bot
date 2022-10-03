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
          minValue: 1,
        },
      ],
    permissions: ['ADMINISTRATOR'],

    callback: ({interaction}) => {
        return `test ${interaction.options.getNumber('number')}`
    },
} as ICommand