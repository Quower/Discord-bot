import { ICommand } from "wokcommands";

export default {
    category: 'cool_commands',
    description: 'replies u',
    guildOnly: true,

    slash: true,

    callback: async ({client, guild}) => {

        
        let cool = new String("")
        guild!.members
        .fetch()
        .then((members) =>
          members.forEach((member) => cool = `${cool}/n${member.user.tag}`),
        );


        return `u${client.emojis.cache.get("987676604970991646")}${client.emojis.cache.get("987676777176498250")}`
    },
} as ICommand