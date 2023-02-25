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
  AnySelectMenuInteraction,
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
export interface commandobject extends command {
  path: fs.PathLike;
  command: string;
  subcommands: subcommandobject[];
}
export interface subcommand {
  description: string;
  callback(client: Client, interaction: ChatInputCommandInteraction): void;
  options?: ApplicationCommandSubCommand["options"];
}
export interface subcommandobject extends subcommand {
  command: string;
  description: string;
}

export type returnMenu = {
  content?: string | undefined;
  embeds?: (APIEmbed | JSONEncodable<APIEmbed>)[] | undefined;
  components?: ActionRowBuilder[];
  ephemeral?: boolean | undefined;
};

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
    waitingForResponse: boolean;
  }): Promise<MessageActionRowComponentBuilder>;
}

export interface buttonobject extends button {
  path: fs.PathLike;
  name: string;
}

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

export interface menuobject extends menu {
  name: string;
  path: fs.PathLike;
};

export type interactionSave = {
  messageId: string;
  interaction: CommandInteraction;
};

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
  exec(options: {
    client: Client;
    guildId: string;
    setting: saveSetting;
  }): boolean;
}

export type saveSetting = {
  name: string;
  type: string;
  value: any;
};

export interface modal {
  callback(options: {
    client: Client;
    interaction: ModalSubmitInteraction;
    data?: any;
  });
  create(
    options: {
      client: Client;
      interaction:
        | ButtonInteraction
        | AnySelectMenuInteraction
        | ChatInputCommandInteraction;
      data?: any;
    },
    modal: ModalBuilder
  );
}

export interface modalobject extends modal {
  path: fs.PathLike;
  name: string;
};
