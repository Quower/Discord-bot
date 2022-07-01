import DiscordJS, { Channel, Intents, Message, VoiceState } from 'discord.js'
import { ICommand } from "wokcommands";

export default {
    category: 'cool_commands',
    description: 'replies u',

    slash: true,
    guildOnly: true,
    options: [
        {
            name: "vctomove",
            description: "wich vc to move",
            required: true,
            type: 'CHANNEL'
            
        },
        {
            name: "vctomoveto",
            description: "wich vc to move to",
            required: true,
            type: 'CHANNEL'
        }
    ],

    callback: async ({client, guild, interaction}) => {
        const options = interaction.options
        const vctomove = options.getChannel('vctomove')
        const vctomoveto = options.getChannel('vctomoveto')
        if (vctomove instanceof DiscordJS.VoiceChannel && vctomoveto instanceof DiscordJS.VoiceChannel) {

            vctomove.members.forEach(member => {
                member.voice.setChannel(vctomoveto)
            });
            interaction.reply({
                content: `moved all members of ${vctomove} to ${vctomoveto}`,
                ephemeral: true
            })

            
            
        } else {
            interaction.reply({
            content: `please input valid voice channels`,
            ephemeral: true
            })
        }

        

 
    },
} as ICommand