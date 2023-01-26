import optionsSchema from "../../../handler/models/optionsSchema";
import { readyEvent } from "../../../handler/typings";
import fs from "fs";
import { saveSetting, settingsCategory } from "../typings";
const config = require("../../../config.json");
import { Schema } from "mongoose";
const settingsfiles = fs.readdirSync("./commanddirs/settings/settingcategorys");
export let settingcategorys: settingsCategory[] = [];
settingsfiles.forEach(async (file) => {
  const category = require(`../settingcategorys/${file}`);
  settingcategorys.push(category);
});

const settingsBase: saveSetting[] = [];
settingcategorys.forEach((category) => {
  category.settings.forEach((setting) => {
    const saveSetting: saveSetting = {
      category: category.name,
      name: setting.name,
      type: setting.type,
      value: setting.defaultValue,
    };
    settingsBase.push(saveSetting);
  });
});

export default {
  async execute(client) {
    if (config.nukeSettings) {
      await optionsSchema.deleteMany();
    }
    if (config.updateSettingsOnStart == true) {
      let optionSchemas = await optionsSchema.find();
      //console.log(optionSchemas)
      for (let options of optionSchemas) {
        //console.log(options)
        let newSettings = settingsBase;
        for (let i = 0; i < newSettings.length; i++) {
          const foundOption = options.options.find(
            (option) => option.name == newSettings[i].name
          );
          if (foundOption) {
            newSettings[i] = foundOption;
          }
        }
        options.options = newSettings;

        options.save();
      }
    }
    const guilds = client.guilds.cache;
    // var settingsUpdate = new Promise((resolve, reject) => {
    guilds.forEach(async (guild) => {
      const guildOptions = await optionsSchema.findOne({ guildId: guild.id });
      if (!guildOptions) {
        await optionsSchema.create({
          guildId: guild.id,
          options: settingsBase,
        })
      }
    });
    // });
    // settingsUpdate.then(async () => {
    console.log(`done with settings updating:\n${await optionsSchema.find()}`);
    // });
  },
} as readyEvent;
