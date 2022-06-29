import { ICommand } from "wokcommands";

export default {
    category: 'cool_commands',
    description: 'replies u',

    slash: true,
    testOnly: true,
    guildOnly: true,

    callback: async ({client, guild}) => {

        
      let cool = new String("")
      await guild!.members
      .fetch()
      .then(async (members) =>
        await members.forEach((member) => cool = `${cool}\n${member.user}`),
      )
        return `u${client.emojis.cache.get("987676604970991646")}${client.emojis.cache.get("987676777176498250")}${cool}`

    },
} as ICommand