import { Client } from "discord.js";
import settingsSchema from "./models/optionsSchema";
import { saveSetting } from "./typings";
import { settingRuns, settingsBase } from "./events/ready";
export default class SettingsHandler {
  guildId!: string;
  client!: Client;
  settings!: saveSetting[];
  updatedSettings: { setting: saveSetting; exec?: string }[] = [];
  // constructor(options: { client: Client; guildId: string }) {
  //   this.init(options);
  // }
  async init(options: { client: Client; guildId: string }) {
    let { client, guildId } = options;
    this.client = client;
    this.guildId = guildId;
    this.settings =
      (await settingsSchema.findOne({ guildId: this.guildId }))?.settings || [];
  }
  async update() {
    console.log(`updated settings:${JSON.stringify(this.updatedSettings)}`);
    if (this.updatedSettings.length > 0) {
      const settings = await settingsSchema.findOne({ guildId: this.guildId });
      if (settings) {
        console.log("got to guild found");
        for await (const updateSetting of this.updatedSettings) {
          const index = settings.settings.findIndex(
            (setting) => setting.name == updateSetting.setting.name
          );
          console.log(index);
          let scontinue = true;
          if (updateSetting.exec) {
            const exec = require(`../${updateSetting.exec}`).default;
            try {
              scontinue = await exec.exec({
                client: this.client,
                guildId: this.guildId,
                setting: updateSetting.setting,
              });
            } catch (e) {
              console.log("error when executing settingupdate");
            }
          }
          if (scontinue == true) {
            if (index == -1) {
              settings.settings.push(updateSetting.setting);
            } else {
              settings.settings[index].value = updateSetting.setting.value;
            }
          }
        }
        settings.markModified("settings");
        await settings.save();
      }

      this.updatedSettings = [];
    }
    this.settings =
      (await settingsSchema.findOne({ guildId: this.guildId }))?.settings || [];
  }
  /**returnAs acepted values: raw, mention, other*/
  async read(options: { settingName: string; retunrAs: string }): Promise<any> {
    let setting;
    console.log(this.settings);
    const index = this.settings.findIndex(
      (setting) => setting.name == options.settingName
    );
    if (index == -1) {
      setting = settingsBase.find(
        (setting) => setting.name == options.settingName
      );
      if (!setting) {
        return;
      }
    } else {
      setting = this.settings[index];
    }
    let channels = [];
    if (setting.value == null) {return undefined}
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
            return `<#${setting.value}>`;
          case "channels":
            for (const channelId of setting.value) {
              channels.push(`<#${channelId}>`);
            }
            return channels;
          case "textChannel":
            return `<#${setting.value}>`;
          case "textChannels":
            for (const channelId of setting.value) {
              channels.push(`<#${channelId}>`);
            }
            return channels;
          case "voiceChannel":
            return `<#${setting.value}>`;
          case "voiceChannels":
            for (const channelId of setting.value) {
              channels.push(`<#${channelId}>`);
            }
            return channels;
          case "member":
            return `<@${setting.value}>`;
          case "members":
            let members = [];
            for (const memberId of setting.value) {
              members.push(`<@${memberId}>`);
            }
            return members;
          case "role":
            return `<@&${setting.value}>`;
          case "roles":
            let roles = [];
            for (const roleId of setting.value) {
              roles.push(`<@&${roleId}>`);
            }
            return roles;
          case "select":
            return setting.value;
        }
        break;
      case "other":
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
                const channel = await this.client.channels.fetch(channelId);
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
                const channel = await this.client.channels.fetch(channelId);
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
                const channel = await this.client.channels.fetch(channelId);
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
            for (const memberId of setting.value) {
              try {
                const guild = await this.client.guilds.fetch(this.guildId);
                const member = await guild.channels.fetch(memberId);
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
            for (const roleId of setting.value) {
              try {
                const guild = await this.client.guilds.fetch(this.guildId);
                const role = await guild.roles.fetch(roleId);
                roles.push(role);
              } catch (e) {
                console.log("something went wrong when fetchin channel");
              }
            }
            return roles;
          case "select":
            return setting.value;
        }
        break;
    }
  }
  async write(options: { settingName: string; value: any }): Promise<void> {
    const setting = settingsBase.find(
      (setting) => setting.name == options.settingName
    );
    const settingRun = settingRuns.find(
      (settingRun) => settingRun.name == options.settingName
    );
    if (setting) {
      setting.value = options.value;
      this.updatedSettings.push({
        setting: setting,
        exec: settingRun?.path,
      });
    }
  }
  // async checkRoles(options: {
  //   optionName: string;
  //   value: any;
  //   member: GuildMember;
  // }): Promise<boolean | void> {
  //   let setting;
  //   const index = this.settings.findIndex(
  //     (setting) => setting.name == options.optionName
  //   );
  //   if (index == -1) {
  //     setting = settingsBase.find(
  //       (setting) => setting.name == options.optionName
  //     );
  //     if (!setting) {
  //       //return;
  //     }
  //   } else {
  //     setting = this.settings[index];
  //   }
  //   if (setting?.type == "roles") {
  //     let retunrperms: perm[] = [];
  //     for (const Perm of setting.value) {
  //       let roles: Role[] = [];
  //       for (const frole of Perm.roles) {
  //         try {
  //           const guild = await this.client.guilds.fetch(this.guildId);
  //           const role = await guild.roles.fetch(frole);
  //           if (role) {
  //             roles.push(role);
  //           }
  //         } catch (e) {
  //           console.log("something went wrong when fetchin channel");
  //         }
  //       }
  //       let members: GuildMember[] = [];
  //       for (const fmember of Perm.member) {
  //         try {
  //           const guild = await this.client.guilds.fetch(this.guildId);
  //           const member = await guild.members.fetch(fmember);
  //           if (member) {
  //             members.push(member);
  //           }
  //         } catch (e) {
  //           console.log("something went wrong when fetchin channel");
  //         }
  //       }
  //       if (Perm.permissions instanceof Array<PermissionsBitField>) {
  //         retunrperms.push({
  //           permissions: Perm.permissions,
  //           members: members,
  //           roles: roles,
  //         });
  //       }
  //     }
  //   }
  //}
}
