import {
  ApplicationCommandOptionData,
  Client,
  ChatInputCommandInteraction,
  ApplicationCommandOption,
  BaseMessageOptions,
  ButtonStyle,
  ButtonInteraction,
  SelectMenuInteraction,
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
  permissions?: PermissionsBitField[];
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
  permissions?: PermissionsBitField[];
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
  components?:
    | (
        | JSONEncodable<APIActionRowComponent<APIMessageActionRowComponent>>
        | ActionRowData<
            MessageActionRowComponentData | MessageActionRowComponentBuilder
          >
        | APIActionRowComponent<APIMessageActionRowComponent>
      )[]
    | undefined;
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
  callback(
    client: Client,
    interaction: ButtonInteraction | SelectMenuInteraction,
    model: Model
  );
  create(
    client: Client,
    guildId?: String,
    channelId?: String,
    userId?: String,
    Indms?: Boolean
  ): AnyComponentBuilder;
}

export interface buttonobject {
  path: fs.PathLike;
  name: string;
  model: Model;
  callback(
    client: Client,
    interaction: ButtonInteraction | SelectMenuInteraction,
    model: mongoose.model
  );
  create(
    client: Client,
    guildId?: String,
    channelId?: String,
    userId?: String,
    Indms?: Boolean
  ): AnyComponentBuilder;
}

/*export type menuInfo = {
  name: string;
  options: any;
};

export type menuSchema = {
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
  create(
    client: Client,
    guildId?: String,
    channelId?: String,
    userId?: String,
    Indms?: Boolean
  ): returnMenu;
}

export type menuobject = {
  create(
    client: Client,
    guildId?: String,
    channelId?: String,
    userId?: String,
    Indms?: Boolean
  ): returnMenu;
  name: string;
  //buttons: buttonobject[];
  //selectMenus: selectMenuobject[];
  path: fs.PathLike;
  //buttons: buttonobject[];
};

export type buttonArray = buttonobject[];
