import {
  Channel,
  Client,
  GuildMember,
  TextChannel,
  VoiceChannel,
} from "discord.js";
import { Type } from "typescript";
import settingsSchema from "../../handler/models/optionsSchema";
import { returnMenu } from "../../handler/typings";
import { settingsBase } from "./events/ready";
import { saveSetting } from "./typings";

export default class SettingsHandler {
  guildId!: string;
  client!: Client;
  settings!: saveSetting[];
  updatedSettings: saveSetting[] = [];
  constructor(options: { client: Client; guildId: string }) {
    this.init(options);
  }
  async init(options: { client: Client; guildId: string }) {
    let { client, guildId } = options;
    this.client = client;
    this.guildId = guildId;
  }
  async update() {
    if (this.updatedSettings.length > 0) {
      const settings = await settingsSchema.findOne({ guildId: this.guildId });
      if (settings) {
        for (const updateSetting of this.updatedSettings) {
          const index = settings.settings.findIndex(
            (setting) => setting.name == updateSetting.name
          );
          if (index == -1) {
            settings.settings.push(updateSetting);
          } else {
            settings.settings[index].value = updateSetting.value;
          }
        }
        await settings.save();
      }

      this.updatedSettings = [];
    }
    this.settings =
      (await settingsSchema.findOne({ guildId: this.guildId }))?.settings || [];
  }
  async read(options: {
    optionName: string;
    retunrAsString: boolean;
  }): Promise<any> {
    let setting;
    const index = this.settings.findIndex(
      (setting) => setting.name == options.optionName
    );
    if (index == -1) {
      setting = settingsBase.find(
        (setting) => setting.name == options.optionName
      );
      if (!setting) {
        return;
      }
    } else {
      setting = this.settings[index];
    }
    switch(setting.type) {
      case 'boolean': 

      break;

      
    }
  }
  async write(options: {
    optionName: string;
    value: any;
    retunrAsString: boolean;
  }): Promise<any> {
    const baseSetting = settingsBase.find(
      (setting) => setting.name == options.optionName
    );

  }
}
