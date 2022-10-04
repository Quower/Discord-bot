import { Client, RoleManager } from "discord.js";
import { ICommand } from "wokcommands";
import coolSchema from "../mongodb/testschema";
import { mongoClient } from "../index";
let number1 = 0

export default {
    category: 'testing commands',
    description: 'command for testing',

    slash: true,
    guildOnly: true,
    testOnly: true,//remove before merging to mater brach
    init: async (client: Client) => { 

    },

    callback: async ({client, guild}) => {
      number1++

      const schema = {
        number: "number1"
      }

      await new coolSchema(schema).save

      return `u${client.emojis.cache.get("987676604970991646")}${client.emojis.cache.get("987676777176498250")}\n${number1}`

    },
} as ICommand