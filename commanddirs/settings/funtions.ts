import {
  Channel,
  Client,
  GuildChannel,
  GuildMember,
  PermissionsBitField,
  Role,
  TextChannel,
  VoiceChannel,
} from "discord.js";
import { Type } from "typescript";
import settingsSchema from "../../handler/models/optionsSchema";
import { returnMenu } from "../../handler/typings";
import { settingRuns, settingsBase } from "./events/ready";
import { perm, savePerm, saveSetting } from "./typings";
export default class SettingsHandler {
  guildId!: string;
  client!: Client;
  settings!: saveSetting[];
  updatedSettings: { setting: saveSetting; exec?: string }[] = [];
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
            (setting) => setting.name == updateSetting.setting.name
          );
          if (index == -1) {
            settings.settings.push(updateSetting);
          } else {
            settings.settings[index].value = updateSetting.setting.value;
          }
        }
        await settings.save();
      }

      this.updatedSettings = [];
    }
    this.settings =
      (await settingsSchema.findOne({ guildId: this.guildId }))?.settings || [];
  }
  /**returnAs acepted values: raw, mention, other*/
  async read(options: { optionName: string; retunrAs: string }): Promise<any> {
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
    switch (options.retunrAs) {
      case "raw":
        return setting.value;

      case "mention": // not finished
        switch (setting.type) {
          case "string":
            return setting.value;
          case "boolean":
            if (setting.value == true) {
              return "true";
            } else if (setting.value == false) {
              return "false";
            }
          case "channel":
            break;
          case "channels":
            break;
          case "textChannel":
            break;
          case "textChannels":
            break;
          case "voiceChannel":
            break;
          case "voiceChannels":
            break;
          case "member": 
            break;
          case "members":
            break;
          case "role":
            break;
          case "roles":
            break;
          case "perms":
            return;
        }
        break;
      case "other":
        let channels = [];
        switch (setting.type) {
          case "string":
            return setting.value;
          case "boolean":
            return setting.value;
          case "channel":
            try {
              const channel = await this.client.channels.fetch(setting.value);
              return channel;
            } catch (e) {
              console.log("something went wrong when fetchin channel");
              return;
            }
          case "channels":
            for (const channelId of setting.value) {
              try {
                const channel = await this.client.channels.fetch(setting.value);
                channels.push(channel);
              } catch (e) {
                console.log("something went wrong when fetchin channel");
              }
            }
            return channels;
          case "textChannel":
            try {
              const channel = await this.client.channels.fetch(setting.value);
              return channel;
            } catch (e) {
              console.log("something went wrong when fetchin channel");
            }
            break;
          case "textChannels":
            for (const channelId of setting.value) {
              try {
                const channel = await this.client.channels.fetch(setting.value);
                channels.push(channel);
              } catch (e) {
                console.log("something went wrong when fetchin channel");
              }
            }
            return channels;
          case "voiceChannel":
            try {
              const channel = await this.client.channels.fetch(setting.value);
              return channel;
            } catch (e) {
              console.log("something went wrong when fetchin channel");
            }
            break;
          case "voiceChannels":
            for (const channelId of setting.value) {
              try {
                const channel = await this.client.channels.fetch(setting.value);
                channels.push(channel);
              } catch (e) {
                console.log("something went wrong when fetchin channel");
              }
            }
            return channels;
          case "member":
            try {
              const guild = await this.client.guilds.fetch(this.guildId);
              const member = await guild.channels.fetch(setting.value);
              return member;
            } catch (e) {
              console.log("something went wrong when fetchin channel");
            }
            break;
          case "members":
            let members = [];
            for (const channelId of setting.value) {
              try {
                const guild = await this.client.guilds.fetch(this.guildId);
                const member = await guild.channels.fetch(setting.value);
                members.push(member);
              } catch (e) {
                console.log("something went wrong when fetchin channel");
              }
            }
            return members;
          case "role":
            try {
              const guild = await this.client.guilds.fetch(this.guildId);
              const role = await guild.roles.fetch(setting.value);
              return role;
            } catch (e) {
              console.log("something went wrong when fetchin channel");
            }
            break;
          case "roles":
            let roles = [];
            for (const channelId of setting.value) {
              try {
                const guild = await this.client.guilds.fetch(this.guildId);
                const role = await guild.roles.fetch(setting.value);
                roles.push(role);
              } catch (e) {
                console.log("something went wrong when fetchin channel");
              }
            }
            return roles;
          case "perms":
            let retunrperms: perm[] = [];
            for (const Perm of setting.value) {
              let roles: Role[] = [];
              for (const frole of Perm.roles) {
                try {
                  const guild = await this.client.guilds.fetch(this.guildId);
                  const role = await guild.roles.fetch(frole);
                  if (role) {
                    roles.push(role);
                  }
                } catch (e) {
                  console.log("something went wrong when fetchin channel");
                }
              }
              let members: GuildMember[] = [];
              for (const fmember of Perm.member) {
                try {
                  const guild = await this.client.guilds.fetch(this.guildId);
                  const member = await guild.members.fetch(fmember);
                  if (member) {
                    members.push(member);
                  }
                } catch (e) {
                  console.log("something went wrong when fetchin channel");
                }
              }
              if (Perm.permissions instanceof Array<PermissionsBitField>) {
                retunrperms.push({
                  permissions: Perm.permissions,
                  members: members,
                  roles: roles,
                });
              }
            }
            return retunrperms;
        }
        break;
    }
  }
  async write(options: {
    optionName: string;
    value: any;
    retunrAsString: boolean;
  }): Promise<any> {
    const setting = settingsBase.find(
      (setting) => setting.name == options.optionName
    );
    const settingRun = settingRuns.find(
      (settingRun) => settingRun.name == options.optionName
    );
    if (setting) {
      setting.value = options.value;
      this.updatedSettings.push({
        setting: setting,
        exec: settingRun?.path,
      });
    }
  }
}
