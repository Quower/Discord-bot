import { ICommand } from "wokcommands";

export default {
    category: 'testing commands',
    description: 'command for testing',
    guildOnly: true,
    slash: true,
    ownerOnly: true,

    callback: async ({client, guild}) => {

        
        let cool = new String("")
        await guild!.members
        .fetch()
        .then(async (members) =>
          await members.forEach((member) => cool = `${cool}\n${member.user}`),
        )
          return `not finished command dab`

    },
} as ICommand