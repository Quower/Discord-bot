import DiscordJS, {
  ChatInputCommandInteraction,
  IntentsBitField,
} from "discord.js";
import dotenv from "dotenv";
import CommandHandler from "./handler/setup";
import CommandInteractionCreate from "./handler/events/CommandInteractionCreate";
//import testSchema from './mongodb/testschema'
dotenv.config();
export const botOwners = ["424279456031703041"];

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

client.on("ready", async () => {
  console.log(`Logged in as: ${client.user?.tag}`);

  if (client.users.cache.get("424279456031703041")) {
    client.users.cache.get("424279456031703041")!.send("bot started");
  }

  new CommandHandler({
    testServers: ["966345190480687167"],
    botOwners: botOwners,
    mongoUri: process.env.MONGODB || "",
    client,
  });

  /*new WOK({
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
  });*/
});

client.login(process.env.TOKEN);

// client.on("messageCreate", async (Message) => {
//   if (Message.author.id === "282859044593598464") {
//     Message.delete();
//   }
// });

/*const events = fs
  .readdirSync("./handler/events")
  .filter((file) => file.endsWith(".ts"));
for (const file of events) {
  const eventName = file.split(".")[0];
  const event = require(`./handler/events/${file}`);
  console.log("test");
  client.on(eventName, event.bind(null, client));
}***/

client.on(DiscordJS.Events.InteractionCreate, (interaction) => {
  if (interaction instanceof ChatInputCommandInteraction) {
    CommandInteractionCreate(client, interaction);
  }
});
