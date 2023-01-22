import DiscordJS, {
  Events,
  PermissionsBitField,
  ChatInputCommandInteraction,
} from "discord.js";
import { botOwners } from "../../index";
import { commandsExport } from "../setup";
import { client } from "../../index";

export default async function (interaction: DiscordJS.Interaction<DiscordJS.CacheType>) {
  let time = Date.now()
  if (interaction instanceof ChatInputCommandInteraction) {
    let commandObject = (await commandsExport).find(
    (comannd) => comannd.command == interaction.commandName
  );
  console.log(`got to commaninteraction point 1:${(Date.now() - time)}`); time = Date.now()

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
        console.log(`got to commaninteraction point 2.1:${(Date.now() - time)}`); time = Date.now()

        subcommandObject?.callback(client, interaction);
      } else {
        console.log(`got to commaninteraction point 2.2:${(Date.now() - time)}`); time = Date.now()
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
};

