import {
  ApplicationCommandOptionData,
  Client,
  ChatInputCommandInteraction,
  ApplicationCommandOption,
  BaseMessageOptions,
  ButtonStyle,
  ButtonInteraction,
  AnyComponentBuilder,
  Events,
  CommandInteraction,
  ModalSubmitInteraction,
  ModalBuilder,
} from "discord.js";
import fs from "fs";
import { Model, model } from "mongoose";
import menuSchema from "./models/menuSchema";

export interface command {
  description: string;
  callback(client: Client, interaction: ChatInputCommandInteraction): void;
  options?: ApplicationCommandOption[];
  allowInDMs?: boolean;
  ownerOnly?: boolean;
  testOnly?: boolean;
  permissions?: PermissionsBitField;
  MainCommand?: boolean;
}

export type commandobject = {
  command: string;
  description: string;
  path: fs.PathLike;
  subcommands: subcommandArray;
  callback(client: Client, interaction: ChatInputCommandInteraction): void;
  options?: ApplicationCommandOption[];
  allowInDMs?: boolean;
  ownerOnly?: boolean;
  testOnly?: boolean;
  permissions?: PermissionsBitField;
  MainCommand?: boolean;
};

export type commandArray = Array<commandobject>;

export interface subcommand {
  description: string;
  callback(client: Client, interaction: ChatInputCommandInteraction): void;
  options?: ApplicationCommandSubCommand["options"];
}

export type subcommandobject = {
  command: string;
  description: string;
  path: fs.PathLike;
  callback(client: Client, interaction: ChatInputCommandInteraction): void;
  options?: ApplicationCommandSubCommand["options"];
};

export type subcommandArray = Array<subcommandobject>;

export type returnMenu = {
  content?: string | undefined;
  embeds?: (APIEmbed | JSONEncodable<APIEmbed>)[] | undefined;
  components?: ActionRowBuilder[];
  ephemeral?: boolean | undefined;
};

/*export interface button {
  callback(client: Client, interaction: ChatInputCommandInteraction);
  label: string;
  style: ButtonStyle;
  emoji?: ComponentEmojiResolvable;
}

export interface buttonobject {
  path: fs.PathLike;
  name: string;
  label: string;
  style: ButtonStyle;
  emoji?: ComponentEmojiResolvable;
  callback(client: Client, interaction: ChatInputCommandInteraction);
}*/

export interface button {
  callback(options: {
    client: Client;
    interaction: ButtonInteraction | AnySelectMenuInteraction;
    data?: any;
    waitingForResponse: boolean;
  });
  create(options: {
    client: Client;
    guildId?: string;
    channelId: string;
    userIds: string[];
    Indms: boolean;
    data?: any;
  }): Promise<MessageActionRowComponentBuilder>;
}

export type buttonobject = {
  path: fs.PathLike;
  name: string;
  callback(options: {
    client: Client;
    interaction: ButtonInteraction | AnySelectMenuInteraction;
    data?: any;
    waitingForResponse: boolean;
  });
  create(options: {
    client: Client;
    guildId?: string;
    channelId: string;
    userIds: string[];
    Indms: boolean;
    data?: any;
    waitingForResponse: boolean;
  }): Promise<MessageActionRowComponentBuilder>;
};

export type menuInfo = {
  name: string;
  waitingForResponse: boolean;
  data: any;
};

export type myEvent = {
  event: Events;
  execute(...args, client: Client);
};

export type readyEvent = {
  execute(client: Client);
};

/*export type menuSchema = {
  permenent: boolean;
  menuInDms: boolean;
  guildId?: string;
  channelId?: string;
  userIds: string[];
  MessageId?: String;
  currentMenu: menuInfo;
  prevMenus: menuInfo[];
};*/

export interface menu {
  create(options: {
    client: Client;
    waitingForResponse: boolean;
    guildId?: string;
    channelId: string;
    userIds: string[];
    Indms: boolean;
    data?: any;
  }): returnMenu;
}

export type menuobject = {
  create(options: {
    client: Client;
    waitingForResponse: boolean;
    guildId?: string;
    channelId: string;
    userIds: string[];
    Indms: boolean;
    data?: any;
  }): returnMenu;
  name: string;
  //buttons: buttonobject[];
  //selectMenus: selectMenuobject[];
  path: fs.PathLike;
  //buttons: buttonobject[];
};

export type buttonArray = buttonobject[];

export type interactionSave = {
  messageId: string;
  interaction: CommandInteraction;
};

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
  validValues?: { values: string[]; max: number; min: number };
};

export interface settingUpdate {
  exec(options: { client: Client; guildId: string; setting: saveSetting }): boolean;
}

export type saveSetting = {
  name: string;
  type: string /*
  Acepted values:
  string, boolean
  channel, channels,
  textChannel, textChannels,
  voiceChannel, voiceChannels,
  member, members,
  role, roles,
  select
  */;
  value: any;
};

export type perm = {
  permissions: PermissionsBitField[];
  members: GuildMember[];
  roles: Role[];
};
export type savePerm = {
  permissions: PermissionsBitField[];
  members: string[];
  roles: string[];
};

export interface modal {
  callback(options: {
    client: Client;
    interaction: ModalSubmitInteraction;
    data?: any;
  });
  create(options: {
    client: Client;
    interaction: ButtonInteraction | AnySelectMenuInteraction | ChatInputCommandInteraction
    data?: any;
  }, modal: ModalBuilder);
}

export type modalobject = {
  path: fs.PathLike;
  name: string;
  callback(options: {
    client: Client;
    interaction: ModalSubmitInteraction;
    data?: any;
  });
  create(options: {
    client: Client;
    interaction: ButtonInteraction | AnySelectMenuInteraction | ChatInputCommandInteraction
    data?: any;
  }, modal: ModalBuilder);
};
