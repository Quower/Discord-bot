import DiscordJS, {
  Events,
  PermissionsBitField,
  ChatInputCommandInteraction,
} from "discord.js";
import { botOwners } from "../../index";
import { commandsExport } from "../setup";
import { client } from "../../index";

client.on(Events.InteractionCreate, async (interaction) => {
  if (interaction instanceof ChatInputCommandInteraction) {
    let commandObject = (await commandsExport).find(
    (comannd) => comannd.command == interaction.commandName
  );

  if (interaction.member?.permissions instanceof PermissionsBitField) {
    if (commandObject?.ownerOnly) {
      if (botOwners.includes(interaction.user.id) == false) {
        await interaction.reply({
          content: `This command is for the bot owner only`,
          ephemeral: true,
        });
        return;
      }
    }

    if (
      (interaction.member?.permissions instanceof PermissionsBitField &&
        commandObject?.permissions &&
        interaction.member?.permissions.has(commandObject?.permissions)) ||
      botOwners.includes(interaction.member.user.id)
    ) {
      if (interaction.options.getSubcommand()) {
        let subcommandObject = commandObject?.subcommands.find(
          (subcommand) =>
            subcommand.command == interaction.options.getSubcommand()
        );

        subcommandObject?.callback(client, interaction);
      } else {
        commandObject?.callback(client, interaction);
      }
    } else {
      interaction.reply({
        content: `You don't have the requiered permissions to run this command`,
        ephemeral: true,
      });
    }
  }
  }
});
