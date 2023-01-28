import DiscordJS, {
  DMChannel,
  TextChannel,
  Events,
  IntentsBitField,
  Message,
  SelectMenuInteraction,
  CommandInteraction,
} from "discord.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Handler from "./handler/setup";
import ChatInputCommandInteractionrun from "./handler/events/ChatInputCommandInteraction";
import ButtonInteractionrun from "./handler/events/ButtonInteraction";
import SelectMenuInteractionrun from "./handler/events/SelectMenuInteraction";
import messageCreaterun from "./handler/events/messageCreate";
import menuSchema from "./handler/models/menuSchema";
import { Player } from "discord-player";
import { MenuDeleteCheck } from "./handler/menuhandlre";
//import testSchema from './mongodb/testschema'
dotenv.config();
export const botOwners = ["424279456031703041"];
const deleteAllMenusOnStart = true;
const deleteMenusWithoutMessage = true;

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

  new Handler({
    testServers: ["966345190480687167"],
    botOwners: botOwners,
    mongoUri: process.env.MONGODB || "",
    client,
  });

  const menus = await menuSchema.find();
  menus.forEach(async (menu) => {
    if (menu.deleteAfter && menu.deleteAfter > 0) {
      if (menu.lastInteraction && menu.deleteAfter) {
        if (menu.ephemeral != undefined) {
          menu.delete();
        } else if (
          Date.now() - (menu.lastInteraction + menu.deleteAfter * 1000) >
          0
        ) {
          // if (menu.interaction[0] instanceof CommandInteraction) {
          //   try {
          //     console.log('got to delete 3 we are tesing')
          //     menu.interaction[0].deleteReply();
          //   } catch (e) {
          //     console.log("something went wrong when deleting interaction reply");
          //   }
          //   menu.delete();
          //   return;
          // }
          try {
            let channel = await client.channels.fetch(menu.channelId || "");
            if (
              channel instanceof DMChannel ||
              channel instanceof TextChannel
            ) {
              try {
                channel.messages.fetch(menu.messageId || "").then((msg) => {
                  if (msg.deletable == true) {
                    msg.delete();
                  }
                });
              } catch (e) {
                console.log("could not find message");
              }
            } else {
              console.log("something wrong with channel");
            }
          } catch (e) {
            console.log("could not find channel");
          }

          menu.delete();
        } else {
          setTimeout(() => {
            MenuDeleteCheck({
              client: client,
              messageId: menu.messageId || "",
            });
          }, menu.lastInteraction + menu.deleteAfter * 1000 - Date.now());
        }
      }
    }
  });
});

client.login(process.env.TOKEN);
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
