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
        }
    });
    
    
})




client.login(process.env.TOKEN)



