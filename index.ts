import DiscordJS, {Intents,} from 'discord.js'
import WOKCommands from 'wokcommands'
import path from 'path'
import dotenv from 'dotenv'
dotenv.config()





export const client = new DiscordJS.Client({
    intents: [
        //Intents.FLAGS.DIRECT_MESSAGES, 
        //Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        //Intents.FLAGS.DIRECT_MESSAGE_TYPING,
        Intents.FLAGS.GUILDS,
        //Intents.FLAGS.GUILD_BANS,
        Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        //Intents.FLAGS.GUILD_INTEGRATIONS,
        //Intents.FLAGS.GUILD_INVITES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        //Intents.FLAGS.GUILD_MESSAGE_TYPING,
        //Intents.FLAGS.GUILD_PRESENCES,
        //Intents.FLAGS.GUILD_SCHEDULED_EVENTS,
        Intents.FLAGS.GUILD_VOICE_STATES,
        //Intents.FLAGS.GUILD_WEBHOOKS
    ]
})


client.on('ready', () => {
    console.log(`Logged in as: ${client.user?.username}${client.user?.tag}`)
    new WOKCommands(client, {
        commandsDir: path.join(__dirname, 'commands'),
        typeScript: true,
        botOwners: '424279456031703041'

    })
    client.guilds.cache.forEach(guild => {
        if (guild.name === "9/11 flight crew") {
            /*const members = guild.members.fetch
            console.log(members)*/
            //let role_member: any
            //let member_role: any
            /*guild!.members
            .fetch()
            .then((members) =>
              members.forEach((member) => {
                if (member.user.tag === "Amercian Spy#6295") {
                    const role_member = member
                    console.log(role_member)
                    guild.roles
                    .fetch()
                    .then((role) =>
                      role.forEach((role) => {
                        if(role.name === "Mod69") {
                            const member_role = role
                            console.log(member_role)
                            if (member_role instanceof DiscordJS.Role && role_member instanceof DiscordJS.GuildMember && member_role && role_member) {
                            role_member.roles.add(member_role)
                        }
                        }
                      }),
                    )
                }
              }),
            )*/
            
            

        }
    });
    
    
})

// client.on('messageCreate', async (message) => {
//     if(message.content === '9090' && message.author.bot) {

//     }
// })




client.login(process.env.TOKEN)


// client.on('voiceStateUpdate', (oldState, newState) => {


//     if(newState.channel?.id === "986734845046714379") {
//         if(newState.member?.id == "424279456031703041" /*|| newState.member?.id == "815929389513703455" */) {
//             return
//         }
//         else {
//             if (newState.member?.voice) 
//             newState.member.voice.disconnect()
//         }
//         // if(newState.member?.id ==="776768978197938178") {
//         //     newState.member.voice.disconnect()
//         // }


//     }
  
//   }
// )

client.on('messageCreate', msg => {
if (msg.content.toLocaleLowerCase().includes("cringe") === true && !msg.member?.user.bot && msg.member?.id !== "424279456031703041") {
    msg.reply({
        content: "no ur cringe"
    })
}
})

