import DiscordJS, { IntentsBitField, Message } from "discord.js";
import path from "path";
import dotenv from "dotenv";
import mongoose, { Mongoose } from "mongoose";
import WOK, { DefaultCommands } from "wokcommands";
//import testSchema from './mongodb/testschema'
dotenv.config();

export const client = new DiscordJS.Client({
  intents: [
    IntentsBitField.Flags.DirectMessages,
    //IntentsBitField.Flags.DirectMessageReactions,
    //IntentsBitField.Flags.DirectMessageTyping,
    IntentsBitField.Flags.Guilds,
    //IntentsBitField.Flags.GuildBans,
    IntentsBitField.Flags.GuildEmojisAndStickers,
    //IntentsBitField.Flags.GuildIntegrations,
    //IntentsBitField.Flags.GuildInvites,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    //IntentsBitField.Flags.GuildMessageReactions,
    //IntentsBitField.Flags.GuildMessageTyping,
    //IntentsBitField.Flags.GuildPresences,
    //IntentsBitField.Flags.GuildScheduledEvents,
    IntentsBitField.Flags.GuildVoiceStates,
    //IntentsBitField.Flags.GuildWebhooks
  ],
});

/*export const mongoClient = client.on('ready', async () => {

    console.log(`Logged in as: ${client.user?.tag}`)

    if (client.users.cache.get('424279456031703041')) {
        client.users.cache.get('424279456031703041')!.send('bot started')
    }

    const wok = new WOKCommands(client, {
        commandsDir: path.join(__dirname, 'commands'),
        typeScript: true,
        testServers: '966345190480687167',
        botOwners: '424279456031703041',
        mongoUri: process.env.MONGODB,
    })
    return wok.mongoConnection

    
})*/

client.on("ready", async () => {
  console.log(`Logged in as: ${client.user?.tag}`);

  if (client.users.cache.get("424279456031703041")) {
    client.users.cache.get("424279456031703041")!.send("bot started");
  }

  new WOK({
    testServers: ["966345190480687167"],
    botOwners: ["424279456031703041"],
    mongoUri: process.env.MONGODB,
    // The client for your bot. This is the only required property
    client,
    // Path to your commands folder
    commandsDir: path.join(__dirname, "commands"),
    // Path to your features folder
    featuresDir: path.join(__dirname, "features"),
    // Configure your event handlers
    events: {
      dir: path.join(__dirname, "events"),
    },
    disabledDefaultCommands: [
       DefaultCommands.ChannelCommand,
       DefaultCommands.CustomCommand,
       DefaultCommands.Prefix,
      // DefaultCommands.RequiredPermissions,
      // DefaultCommands.RequiredRoles,
      // DefaultCommands.ToggleCommand
    ],
  });
});

client.login(process.env.TOKEN);

client.on("messageCreate", async (Message) => {
  if (Message.author.id === "282859044593598464") {
    Message.delete();
  }
});
