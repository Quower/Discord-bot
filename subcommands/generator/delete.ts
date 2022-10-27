import {
  Client,
  MessageButton,
  MessageEmbed,
  CommandInteraction,
  MessageActionRow,
} from "discord.js";
import { MessageButtonStyles } from "discord.js/typings/enums";
import { Select_Generator } from "../../functions/generator_selector";

exports.run = async (client: Client, interaction: CommandInteraction) => {
  const row = await Select_Generator(
    interaction.guild,
    "deletechannel",
    1,
    1,
    client
  );
  const row2 = new MessageActionRow();
  row2.addComponents(
    new MessageButton()
      .setCustomId("deletechannelcancel")
      .setLabel("Cancel")
      .setStyle(MessageButtonStyles.SECONDARY)
  );
  const embed2 = new MessageEmbed();
  embed2.title = ":loud_sound: Delete generator";
  interaction.editReply({
    embeds: [embed2],
    components: [row, row2],
  });
};
