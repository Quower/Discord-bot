import {
  ApplicationCommandOptionData,
  Client,
  ChatInputCommandInteraction,
  ApplicationCommandOption,
} from "discord.js";
import fs from "fs";
import { subcommandArray } from "./subcommand";

export interface command {
  description: String;
  callback(client: Client, interaction: ChatInputCommandInteraction): void;
  options?: ApplicationCommandOption[];
  guildOnly?: Boolean;
  ownerOnly?: Boolean;
  testOnly?: Boolean;
  permissions?: String[];
  noManinCommand: Boolean;
}


export type commandobject = {
  command: String;
  description: String;
  path: fs.PathLike;
  subcommands: subcommandArray;
  callback(client: Client, interaction: ChatInputCommandInteraction): void;
  options: ApplicationCommandOption[];
  guildOnly?: Boolean;
  ownerOnly?: Boolean;
  testOnly?: Boolean;
  permissions?: String[];
  noManinCommand: Boolean;
};


export type commandArray = Array<commandobject>;
