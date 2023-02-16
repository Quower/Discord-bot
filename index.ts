import DiscordJS, { DMChannel, TextChannel, IntentsBitField } from "discord.js";
import dotenv from "dotenv";
import Handler from "./handler/setup";
import menuSchema from "./handler/models/menuSchema";
import { MenuDeleteCheck } from "./handler/menuhandlre";
//import testSchema from './mongodb/testschema'
dotenv.config();
export const botOwners = ["424279456031703041"];
const deleteAllMenusOnStart = true;
const deleteMenusWithoutMessage = true;

export const client = new DiscordJS.Client({
  intents: [
    IntentsBitField.Flags.AutoModerationConfiguration,
    IntentsBitField.Flags.AutoModerationExecution,
    IntentsBitField.Flags.DirectMessageReactions,
    IntentsBitField.Flags.DirectMessageTyping,
    IntentsBitField.Flags.DirectMessages,
    IntentsBitField.Flags.GuildBans,
    IntentsBitField.Flags.GuildEmojisAndStickers,
    IntentsBitField.Flags.GuildIntegrations,
    IntentsBitField.Flags.GuildInvites,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessageReactions,
    IntentsBitField.Flags.GuildMessageTyping,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildPresences,
    IntentsBitField.Flags.GuildScheduledEvents,
    IntentsBitField.Flags.GuildVoiceStates,
    IntentsBitField.Flags.GuildWebhooks,
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.MessageContent
  ],
});
client.on("ready", async () => {
  console.log(`Logged in as: ${client.user?.tag}`);

  // if (client.users.cache.get("424279456031703041")) {
  //   client.users.cache.get("424279456031703041")!.send("bot started");
  // }

  new Handler({
    testServers: ["966345190480687167"],
    botOwners: botOwners,
    mongoUri: process.env.MONGODB || "",
    client,
  });
});

client.login(process.env.TOKEN);
client.on("interactionCreate", (interaction) => {
  console.log(interaction);
});


// client.on(Events.InteractionCreate, async (interaction) => {
//   ChatInputCommandInteractionrun(interaction);
// });
// client.on(Events.InteractionCreate, async (interaction) => {
//   ButtonInteractionrun(interaction);
// });
// client.on(Events.InteractionCreate, async (interaction) => {
//   SelectMenuInteractionrun(interaction);
// });
// client.on(Events.MessageCreate, async (message) => {
//   messageCreaterun(message);
// });
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
