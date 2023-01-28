import { Client, GuildMember, Role } from "discord.js";

export type settingsCategory = {
  name: string;
  display: string;
  description: string;
  settings: setting[];
};
export type setting = {
  name: string;
  display: string;
  description: string;
  type: string;
  defaultValue: any;
  updateExec?: string;
  validValues?: string[];
};

settingUpdate = {
  exec(options:{
    client: Client,
    guildId: string,
    setting: setting
  }): boolean
}

export type saveSetting = {
  name: string;
  type: string;/*
  Acepted values:
  string, boolean
  channel, channels,
  textChannel, textChannels,
  voiceChannel, voiceChannels,
  member, members,
  role, roles,
  perms

  */
  value: any;
};

export type perm = {
  permissions: PermissionsBitField[],
  members: GuildMember[],
  roles: Role[]
}
export type savePerm = {
  permissions: PermissionsBitField[],
  members: string[],
  roles: string[]
}
