import settingsSchema from "../../../handler/models/optionsSchema";
import { readyEvent } from "../../../handler/typings";
import fs from "fs";
import { saveSetting, settingsCategory } from "../typings";
const config = require("../../../config.json");
import mongoose, { Schema } from "mongoose";
const settingsfiles = fs.readdirSync("./commanddirs/settings/settingcategorys");
export const settingcategorys: settingsCategory[] = [];
settingsfiles.forEach(async (file) => {
  const category = require(`../settingcategorys/${file}`);
  settingcategorys.push(category);
});

export const settingRuns: { name: string; path: string }[] = [];
export const settingsBase: saveSetting[] = [];
settingcategorys.forEach((category) => {
  category.settings.forEach((setting) => {
    const saveSetting: saveSetting = {
      name: setting.name,
      type: setting.type,
      value: setting.defaultValue,
    };
    settingsBase.push(saveSetting);
    if (setting.updateExec) {
      settingRuns.push({
        name: setting.name,
        path: setting.updateExec
      })
    }
  });
});

export default {
  async execute(client) {
    if (config.nukeEntireDB) {
      mongoose.connection.dropDatabase();
      throw new Error("DATABASE NUKE COMPLETE!!!!!");
    }
    if (config.nukeSettings) {
      await settingsSchema.deleteMany();
      throw new Error("Settings nuke complete!");
    }
    if (config.updateSettingsOnStart == true) {
      let settingSchemas = await settingsSchema.find();
      //console.log(optionSchemas)
      for (let settings of settingSchemas) {
        //console.log(options)
        let newSettings = settingsBase;
        for (let i = 0; i < newSettings.length; i++) {
          const foundOption = settings.settings.find(
            (setting) => setting.name == newSettings[i].name
          );
          if (foundOption) {
            newSettings[i] = foundOption;
          }
        }
        settings.settings = newSettings;

        settings.save();
      }
    }
    const guilds = client.guilds.cache;
    // var settingsUpdate = new Promise((resolve, reject) => {
    guilds.forEach(async (guild) => {
      const guildOptions = await settingsSchema.findOne({ guildId: guild.id });
      if (!guildOptions) {
        await settingsSchema.create({
          guildId: guild.id,
          options: settingsBase,
        });
      }
    });
    // });
    // settingsUpdate.then(async () => {
    console.log(`done with settings updating:\n${await settingsSchema.find()}`);
    // });
  },
} as readyEvent;
