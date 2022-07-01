import { DisTube } from "distube";
import { ICommand } from "wokcommands";

export default {
    category: 'music commands',
    description: 'starts playing music',

    slash: true,
    guildOnly: true,
    options: [ 
        {
            name: "song",
            description: "link or name of the song you want to play",
            type: 'STRING',
            required: true
        },
        {
            name: "platform",
            description: "what platform to seach song on",
            type: 'STRING',
            required: false,
            choices: [{ name: 'spotify', value: 'spotify' }, { name: 'youtube', value: 'youtube' }],
            
        }
    ],
    

    callback: async ({client, guild, member, interaction}) => {
        if (!member.voice.channel) {
            interaction.reply({
                content: 'you are not in a vc',
                ephemeral: true
            })
        } 
     



    },
} as ICommand