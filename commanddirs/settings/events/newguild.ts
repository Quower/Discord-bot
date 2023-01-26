import optionsSchema from "../../../handler/models/optionsSchema";
import { myEvent, readyEvent } from "../../../handler/typings";
import fs from "fs";
import { saveSetting, settingsCategory } from "../typings";
const config = require("../../../config.json");
import { Schema } from "mongoose";
import { Events } from "discord.js";


export default {
    event: Events.GuildCreate,
  async execute(guild, client) {
    console.log('new guild event ran')
  },
} as myEvent;
