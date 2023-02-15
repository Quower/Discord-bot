import optionsSchema from "../models/optionsSchema";
import { myEvent } from "../typings";
const config = require("../../config.json");
import { Events, Guild } from "discord.js";
import { settingsBase } from "./ready";

export default {
  event: Events.GuildCreate,
  async execute(guild, client) {
    if (guild instanceof Guild) {
      const guildOptions = await optionsSchema.findOne({ guildId: guild.id });
      if (!guildOptions) {
        await optionsSchema.create({
          guildId: guild.id,
          options: settingsBase,
        });
      }
    }
  },
} as myEvent;
