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
};

export type saveSetting = {
  name: string;
  type: string;/*
  Acepted values:
  string, boolean
  channel, channels,
  textChannel, textChannels,
  voiceChannel, voiceChannels,
  member, members,
  role, roles(accepts users),

  */
  value: any;
};
