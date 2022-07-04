import { Client } from "discord.js";
import { ICommand } from "wokcommands";
import  Vuu  from "../mongodb/uu"
let number1 = 0

export default {
    category: 'cool_commands',
    description: 'replies u',

    slash: true,
    guildOnly: true,
    init: async (client: Client) => { 
      await new Vuu({
        number: 0
      })


    },

    callback: async ({client, guild}) => {

      /*const data = new Vuu({
        number: number1 + 1
      }) 

      await data.save().catch((e: any) => console.log(e));*/
      
      /*let cool = new String("")
      await guild!.members
      .fetch()
      .then(async (members) =>
        await members.forEach((member) => cool = `${cool}\n${member.user}`),
      )*/
        return `u${client.emojis.cache.get("987676604970991646")}${client.emojis.cache.get("987676777176498250")}\n${number1}`

    },
} as ICommand