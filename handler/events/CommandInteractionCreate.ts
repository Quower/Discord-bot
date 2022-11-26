import {
  Client,
  CommandInteraction,
  Interaction,
  InteractionCollector,
  PermissionsBitField,
  ChatInputCommandInteraction,
} from "discord.js";
import { botOwners } from "../../index";
import { commandsExport } from "../setup";

export default async (
  client: Client,
  interaction: ChatInputCommandInteraction
) => {
  console.log("test3");
  let commandObject = (await commandsExport).find(
    (comannd) => comannd.command == interaction.commandName
  );
  console.log("test4");

  if (interaction.member?.permissions instanceof PermissionsBitField) {
    if (commandObject?.ownerOnly) {
      if (botOwners.includes(interaction.member.user.id) == false) {
        await interaction.reply({
          content: `This command is for the bot owner only`,
          ephemeral: true,
        });
        return;
      }
    }
    console.log("test5");

    if (
      (interaction.member?.permissions instanceof PermissionsBitField &&
        commandObject?.permissions &&
        interaction.member?.permissions.has(commandObject?.permissions)) ||
      botOwners.includes(interaction.member.user.id)
    ) {
      console.log("test6");

      if (interaction.options.getSubcommand()) {
        console.log("test71");

        let subcommandObject = commandObject?.subcommands.find(
          (subcommand) =>
            subcommand.command == interaction.options.getSubcommand()
        );
        console.log(`test81`);

        subcommandObject?.callback(client, interaction);
      } else {
        console.log("test72");

        commandObject?.callback(client, interaction);
      }
    } else {
      interaction.reply({
        content: `You don't have the requiered permissions to run this command`,
        ephemeral: true,
      });
    }
  }
};
