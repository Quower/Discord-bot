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
import menuSchema, { menuI } from "./models/menuSchema";

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
    /**
     * @deprecated Use {@link model.data} instead.
     */
    data?: any;
    /**
     * @deprecated Use {@link model.waitingForResponse} instead.
     */
    waitingForResponse: boolean;
    model: menuI;
  });
  create(options: {
    client: Client;
    /**
     * @deprecated Use {@link model.guildId} instead.
     */
    guildId?: string;
    /**
     * @deprecated Use {@link model.channelId} instead.
     */
    channelId: string;
    /**
     * @deprecated Use {@link model.userIds} instead.
     */
    userIds: string[];
    /**
     * @deprecated Use {@link model.Indms} instead.
     */
    Indms: boolean;
    /**
     * @deprecated Use {@link model.data} instead.
     */
    data?: any;
    /**
     * @deprecated Use {@link model.waitingForResponse} instead.
     */
    waitingForResponse: boolean;
    model: menuI;
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
  create(
    options: {
      client: Client;
      /**
       * @deprecated Use {@link model.waitingForResponse} instead.
       */
      waitingForResponse: boolean;
      /**
       * @deprecated Use {@link model.guildId} instead.
       */
      guildId?: string;
      /**
       * @deprecated Use {@link model.channelId} instead.
       */
      channelId: string;
      /**
       * @deprecated Use {@link model.userIds} instead.
       */
      userIds: string[];
      /**
       * @deprecated Use {@link model.Indms} instead.
       */
      Indms: boolean;
      /**
       * @deprecated Use {@link model.data} instead.
       */
      data?: any;
      model: menuI;
    }
  ): returnMenu;
}

export interface menuobject extends menu {
  name: string;
  path: fs.PathLike;
}

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
}
