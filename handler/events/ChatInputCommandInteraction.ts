import {
  Events,
  PermissionsBitField,
  ChatInputCommandInteraction,
  Client,
  DMChannel,
} from "discord.js";
import { botOwners } from "../../index";
import { commandsExport } from "../setup";
import { myEvent } from "../typings";

export default {
  event: Events.InteractionCreate,
  execute: async (
    interaction, //: DiscordJS.Interaction<DiscordJS.CacheType>,
    client: Client
  ) => {
    let time = Date.now();
    if (interaction instanceof ChatInputCommandInteraction) {
      let commandObject = (await commandsExport).find(
        (comannd) => comannd.command == interaction.commandName
      );
      console.log(await interaction.memberPermissions.toArray());
      console.log(`got to commaninteraction point 1:${Date.now() - time}`);
      time = Date.now();

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
          botOwners.includes(interaction.member.user.id) ||
          interaction.channel instanceof DMChannel ||
          interaction.user.id == interaction.guild.ownerId
        ) {
          if (!commandObject?.MainCommand) {
            let subcommandObject = commandObject?.subcommands.find(
              (subcommand) =>
                subcommand.command == interaction.options.getSubcommand()
            );
            console.log(
              `got to commaninteraction point 2.1:${Date.now() - time}`
            );
            time = Date.now();

            subcommandObject?.callback(client, interaction);
          } else {
            console.log(
              `got to commaninteraction point 2.2:${Date.now() - time}`
            );
            time = Date.now();
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
  },
} as myEvent;
