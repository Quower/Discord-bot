import DiscordJS, { DMChannel, TextChannel, IntentsBitField } from "discord.js";
import dotenv from "dotenv";
import Handler from "./handler/setup";
dotenv.config({path: "./.env2"});
export const botOwners = ["424279456031703041"];
import { Player } from "discord-player";

export const client = new DiscordJS.Client({
  intents: [
    IntentsBitField.Flags.DirectMessageTyping,
    IntentsBitField.Flags.DirectMessages,
    IntentsBitField.Flags.GuildEmojisAndStickers,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessageTyping,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildPresences,
    IntentsBitField.Flags.GuildVoiceStates,
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.MessageContent,
  ],
});

export const player = new Player(client, {
  ytdlOptions: {
    quality: "highestaudio",
  },
});

client.on("ready", async () => {
  console.log(`Logged in as: ${client.user?.tag}`);

  new Handler({
    testServers: ["966345190480687167"],
    botOwners: botOwners,
    mongoUri: process.env.MONGODB || "",
    client,
  });
});

client.login(process.env.TOKEN);
