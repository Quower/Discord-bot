import { Client, CommandInteraction } from "discord.js";
import fs from "fs";
import { subcommandobject } from "../../models/subcommandarray";

export async function Setup_Subcommands(
  folder: fs.PathLike
): Promise<Array<subcommandobject>> {
  const subcommandfiles = fs
    .readdirSync(folder)
    .filter((file) => file.endsWith(".ts"));
  let subcommands = new Array();
  subcommandfiles.forEach((subcommandfile) => {
    const name = subcommandfile.replace(".ts", "");
    const subcommandpath = `${folder}${name}`;
    const subcommandexport = require(`../.${subcommandpath}`);
    const subcommand = {
      command: name,
      description: subcommandexport.default.description,
      path: subcommandpath,
      callback: function (client: Client, interaction: CommandInteraction) {
        subcommandexport.default.callback(client, interaction);
      },
    } as subcommandobject;

    subcommands.push(subcommand);
  });
  return subcommands;
}
