import { GuildScheduledEventPrivacyLevels } from "discord.js/typings/enums";
import { ICommand } from "wokcommands";
let spamming = new Boolean();
export default {
  category: "message stuff",
  description: "spamms messages",

  slash: true,
  testOnly: true,
  options: [
    {
      name: "text",
      description: "text to spamm",
      required: true,
      type: "STRING",
    },
    {
      name: "stop_start",
      description: "stopp spamming?",
      required: true,
      type: "STRING",
      choices: [
        { name: "start", value: "start" },
        { name: "stop", value: "stop" },
      ],
    },
  ],
  Cooldown: "30s",
  permissions: ["ADMINISTRATOR"],

  callback: async ({ interaction, channel }) => {
    if (interaction.options.getString("stop/start") === "stop") {
      spamming = false;
      interaction.reply({
        content: `spamming stopped`,
        ephemeral: true,
      });
    } else {
      spamming = true;
      interaction.reply({
        content: `started spamming`,
        ephemeral: true,
      });

      const spamm_text = interaction.options.getString("text");
      while (spamming === true) {
        setTimeout(function () {
          if (spamming === false) {
            return;
          }
          channel.send({
            content: spamm_text,
          });
        }, 1000);
      }
    }
  },
} as ICommand;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
