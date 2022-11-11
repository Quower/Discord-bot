import fs from "fs";
import { ApplicationCommandOptionData, Options,  Client, CommandInteraction} from "discord.js";


export type subcommandobject = {
    command: String,
    description: String,
    path: fs.PathLike,
    callback(client: Client, interaction: CommandInteraction): void,
  }


export type subcommandArray = (Array<subcommandobject>)