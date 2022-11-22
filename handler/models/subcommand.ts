import {
  Client,
  ChatInputCommandInteraction,
  ApplicationCommandOption,
} from "discord.js";
import fs from "fs";

export interface subcommand {
  description: String;
  callback(client: Client, interaction: ChatInputCommandInteraction): void;
  options?: ApplicationCommandOption[];
  guildOnly?: Boolean;
  ownerOnly?: Boolean;
  testOnly?: Boolean;
  permissions?: String[];
}

export type subcommandobject = {
  command: String;
  description: String;
  path: fs.PathLike;
  callback(client: Client, interaction: ChatInputCommandInteraction): void;
  options: ApplicationCommandOption[];
  guildOnly?: Boolean;
  ownerOnly?: Boolean;
  testOnly?: Boolean;
  permissions?: String[];
};

export type subcommandArray = Array<subcommandobject>;
