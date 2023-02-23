import settingsSchema from "../models/optionsSchema";
import { readyEvent } from "../typings";
import fs from "fs";
import { saveSetting, settingsCategory } from "../../handler/typings";
const config = require("../../config.json");
import mongoose from "mongoose";
import { MenuDeleteCheck } from "../menuhandlre";
import menuSchema from "../models/menuSchema";
import { DMChannel, TextChannel } from "discord.js";
const settingsfiles = fs.readdirSync("./handler/settingcategorys");
export let settingcategorys: settingsCategory[] = [];
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
        path: setting.updateExec,
      });
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
    if (config.nukeMenusDB) {
      await menuSchema.deleteMany();
      //throw new Error("Settings nuke complete!");
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
    console.log(await settingsSchema.find());
    console.log(`done with ready`);
  },
} as readyEvent;
