import optionsSchema from "../../../handler/models/optionsSchema";
import { readyEvent } from "../../../handler/typings";
import fs from "fs";
import { settingsCategory } from "../typings";
import config from "../../../config.json";
const settingsfiles = fs.readdirSync("./commanddirs/settings/settingcategorys");
let settingcategorys: settingsCategory[] = [];
settingsfiles.forEach(async (file) => {
  const category = require(`../settingcategorys/${file}`);
  settingcategorys.push(category);
});

export default {
  async execute(client) {
    if (config.updateSettingsOnStart == true) {
      const guilds = client.guilds.cache;
      guilds.forEach(async (guild) => {
        const guildOptions = await optionsSchema.findOne({ guildId: guild.id });
        
        
      });
    }
  },
} as readyEvent;
