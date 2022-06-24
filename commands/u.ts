import { ICommand } from "wokcommands";

export default {
    category: 'cool_commands',
    description: 'replies u',

    slash: true,
    testOnly: true,

    callback: async ({client, guild}) => {

        
        
        guild!.members
  .fetch()
  .then((members) =>
    members.forEach((member) => console.log(`${member.user.username}#${member.user.tag}`)),
  );
        
        /*const id = '966345190480687167';
const guild1 = client.guilds.cache.find((g) => g.id === id);

if (!guild1)
  return `Can't find any guild with the ID "${id}"`

guild1.members
  .fetch()
  .then((members) =>
    members.forEach((member) => console.log(member.user.username)),
  );*/


        return `u${client.emojis.cache.get("987676604970991646")}${client.emojis.cache.get("987676777176498250")}`
    },
} as ICommand