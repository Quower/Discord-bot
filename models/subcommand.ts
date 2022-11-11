import { ApplicationCommandOptionData, Options,  Client, CommandInteraction} from "discord.js";

export interface subcommand {
    description: string
    callback(client: Client, interaction: CommandInteraction): void
    options?: ApplicationCommandOptionData[]
  }