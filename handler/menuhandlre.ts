import {
  ChatInputCommandInteraction,
  Client,
  CommandInteraction,
  DMChannel,
  TextChannel,
} from "discord.js";
import { menuInfo, returnMenu } from "./typings";
//import { client } from "../index";
import menuSchema from "./models/menuSchema";
import { menusExport } from "./setup";
export const Menus = {
  create: async (options: {
    menu: string;
    client: Client;
    where: ChatInputCommandInteraction | DMChannel | TextChannel | String;
    saveMenu?: boolean;
    deleteAfter: number;
    waitingForResponse?: boolean;
    userIds?: string[];
    saveState?: boolean;
    ephemeral?: boolean;
    data?: any;
  }) => {
    let time = Date.now();
    let menu = new menuSchema();
    if ((menu.waitingForResponse = true)) {
      const generators = await menuSchema.find({ waitingForResponse: true });
      if (generators) {
        menu.waitingForResponse = false;
      } else {
        menu.waitingForResponse = true;
      }
    } else {
      menu.waitingForResponse = false;
    }
    if (options.saveMenu) {
      menu.saveMenu = options.saveMenu;
    } else {
      menu.saveMenu = false;
    }
    menu.data = options.data;
    menu.deleteAfter = options.deleteAfter;
    if (options.saveState) {
      menu.saveState = options.saveState;
    } else {
      menu.saveState = true;
    }
    menu.currentMenu = options.menu;
    menu.prevMenus = new Array();
    if (options.userIds) {
      menu.userIds = options.userIds;
    } else {
      menu.userIds = [];
    }
    console.log(`got to menus create point 1:${Date.now() - time}`);
    time = Date.now();
    let menuObject = (await menusExport).find(
      (menu) => menu.name == options.menu
    );
    console.log(`got to menus create point 2:${Date.now() - time}`);
    time = Date.now();
    if (!menuObject) {
      console.log(`no menu found with name:${options.menu}`);
      return;
    }
    let sendplace: DMChannel | TextChannel | CommandInteraction | undefined =
      undefined;
    if (
      options.where instanceof DMChannel ||
      options.where instanceof TextChannel
    ) {
      if (options.where instanceof DMChannel) {
        menu.inDms = true;
      } else {
        menu.inDms = false;
      }
      sendplace = options.where;
    } else if (options.where instanceof CommandInteraction) {
      const channel = options.where.channel;
      if (channel instanceof DMChannel) {
        menu.inDms = true;
      } else {
        menu.inDms = false;
      }
      sendplace = options.where;
    } else if (typeof options.where === "string") {
      const channel = await options.client.channels.fetch(options.where);
      if (channel instanceof DMChannel || channel instanceof TextChannel) {
        if (channel instanceof DMChannel) {
          menu.inDms = true;
        } else {
          menu.inDms = false;
        }
        sendplace = channel;
      } else {
        console.log(`no channel found with using id`);
        return;
      }
    }
    console.log(`got to menus create point 3:${Date.now() - time}`);
    time = Date.now();
    if (sendplace instanceof DMChannel || sendplace instanceof TextChannel) {
      let guildId: string | undefined;
      if (sendplace instanceof TextChannel) {
        guildId = sendplace.guildId;
      }
      console.log(`got to menus create point 4.1:${Date.now() - time}`);
      time = Date.now();
      const message = await menuObject.create({
        client: options.client,
        waitingForResponse: menu.waitingForResponse,
        userIds: options.userIds,
        Indms: menu.inDms,
        data: options.data,
        guildId: guildId,
        channelId: sendplace.id,
      });
      console.log(`got to menus create point 5.1:${Date.now() - time}`);
      time = Date.now();
      await sendplace
        .send({
          components: message.components,
          content: message.content,
          embeds: message.embeds,
        })
        .then((msg) => {
          menu.messageId = msg.id;
          menu.guildId = msg.guildId || undefined;
          menu.channelId = msg.channelId;
        });
      console.log(`got to menus create point 6.1:${Date.now() - time}`);
      time = Date.now();
    } else if (sendplace instanceof CommandInteraction) {
      let guildId: string | undefined;
      if (sendplace.channel instanceof TextChannel) {
        guildId = sendplace.channel.guildId;
      }
      console.log(`got to menus create point 4.2:${Date.now() - time}`);
      time = Date.now();
      const message = await menuObject.create({
        client: options.client,
        waitingForResponse: menu.waitingForResponse,
        userIds: options.userIds,
        Indms: menu.inDms,
        data: options.data,
        guildId: guildId,
        channelId: sendplace.id,
      });
      console.log(`got to menus create point 5.2:${Date.now() - time}`);
      time = Date.now();
      message.ephemeral = options.ephemeral;
      //console.log(JSON.stringify(message, null, "  "));
      //console.log("got to before reply");
      await sendplace.reply(message);
      console.log(`got to menus create point 6.2:${Date.now() - time}`);
      time = Date.now();
      const msg = await sendplace.fetchReply();
      menu.messageId = msg.id;
      menu.guildId = msg.guildId || undefined;
      menu.channelId = msg.channelId;
      //console.log("sendplace before seting:");
      //console.log(sendplace);
      console.log(`got to menus create point 6.21:${Date.now() - time}`);
      time = Date.now();
      //menu.interaction = [sendplace]
    }
    menu.lastInteraction = Date.now();
    //console.log(`menu at create end:\n${menu} \n`);
    console.log(`got to menus create point 7:${Date.now() - time}`);
    time = Date.now();
    menu.save();
    console.log(`got to menus create point 8:${Date.now() - time}`);
    time = Date.now();
    if (menu.deleteAfter > 0) {
      setTimeout(() => {
        MenuDeleteCheck({ client: options.client, messageId: menu.messageId || "" });
      }, menu.deleteAfter * 1000);
    }

    return;
  },
  update: async (options: {
    menu?: string | "back";
    messageId: string;
    saveMenu?: boolean;
    client: Client;
    deleteAfter?: number;
    waitingForResponse?: boolean;
    userIds?: { ids: string[]; mode: "set" | "add" | "remove" };
    saveState?: boolean;
    data?: any;
  }) => {
    let time = Date.now();
    const menudb = await menuSchema.findOne({ messageId: options.messageId });
    console.log(`got to menus update point 1:${Date.now() - time}`);
    time = Date.now();
    if (!menudb) {
      return;
    }
    let menuName: string;
    let back = false;
    let data: any;
    let waitingForResponse: boolean;
    console.log(`got to menus update point 2:${Date.now() - time}`);
    time = Date.now();
    if (options.menu) {
      if (options.menu == "back") {
        const last = menudb?.prevMenus[menudb.prevMenus.length - 1];
        if (!last) {
          Menus.delete({
            messageId: options.messageId,
            client: options.client,
          });
          return;
        }
        back = true;
        menuName = last.name;
        data = last.data;
        waitingForResponse = last.data;
      } else {
        menuName = options.menu;
        if (options.waitingForResponse) {
          waitingForResponse = options.waitingForResponse;
        } else {
          waitingForResponse = false;
        }
        if (options.data) {
          console.log(options.data);
          data = options.data;
        }
      }
    } else {
      menuName = menudb?.currentMenu || "";
      if (options.waitingForResponse) {
        waitingForResponse = options.waitingForResponse;
      } else {
        waitingForResponse = menudb.waitingForResponse || false;
      }
      if (options.data) {
        data = options.data;
      } else {
        data = menudb.data;
      }
    }
    console.log(`got to menus update point 3:${Date.now() - time}`);
    time = Date.now();
    if (options.deleteAfter) {
      menudb.deleteAfter = options.deleteAfter;
    }

    if (options.userIds) {
      switch (options.userIds.mode) {
        case "set":
          menudb.userIds = options.userIds.ids;
          break;
        case "add":
          menudb.userIds.concat(options.userIds.ids);
          break;
        case "remove":
          for (const userid of options.userIds.ids) {
            let index = menudb.userIds.indexOf(userid);
            if (index !== -1) {
              menudb.userIds.splice(index, 1);
            }
          }
          break;
      }
    }
    console.log(`got to menus update point 4:${Date.now() - time}`);
    time = Date.now();
    if (back == true) {
      menudb?.prevMenus.pop();
    } else if (menudb.saveMenu == true) {
      const menuI: menuInfo = {
        name: menudb.currentMenu || "",
        waitingForResponse: menudb.waitingForResponse || false,
        data: menudb.data,
      };
      menudb.prevMenus.push(menuI);
    }
    menudb.currentMenu = menuName;
    menudb.waitingForResponse = waitingForResponse;
    menudb.data = data;
    if (options.saveMenu) {
      menudb.saveMenu = options.saveMenu;
    } else {
      menudb.saveMenu = true;
    }
    let menuObject = (await menusExport).find((menu) => menu.name == menuName);
    if (!menuObject) {
      console.log("no menu found and ur code is fucked");
      return;
    }
    console.log(`got to menus update point 5:${Date.now() - time}`);
    time = Date.now();
    const message = await menuObject.create({
      client: options.client,
      waitingForResponse: waitingForResponse,
      userIds: menudb.userIds,
      Indms: menudb.inDms,
      data: data,
      guildId: menudb.guildId,
      channelId: menudb.channelId,
    });
    // if (menudb.interaction[0] instanceof CommandInteraction) {
    //   console.log('got to edit 1 we are tesing')
    //   try {
    //     menudb.interaction[0].editReply(message).then(() => {
    //       menudb.lastInteraction = Date.now();
    //       menudb.save();
    //       if (menudb.deleteAfter && menudb.deleteAfter > 0) {
    //         setTimeout(() => {
    //           MenuDeleteCheck({ client: client, messageId: menudb.messageId || "" });
    //         }, menudb.deleteAfter * 1000);
    //         return;
    //       }
    //     });
    //   } catch (e) {
    //     console.log("something went wrong when editing interaction reply");
    //     return;
    //   }
    //   return;
    // }
    try {
      console.log(`got to menus update point 6:${Date.now() - time}`);
      time = Date.now();
      const channel = await options.client.channels.fetch(menudb.channelId || "");
      console.log(`got to menus update point 7:${Date.now() - time}`);
      time = Date.now();
      if (channel instanceof DMChannel || channel instanceof TextChannel) {
        try {
          console.log(`got to menus update point 8:${Date.now() - time}`);
          time = Date.now();
          const msg = await channel.messages.fetch(options.messageId);
          console.log(`got to menus update point 9:${Date.now() - time}`);
          time = Date.now();
          msg.edit(message).then(() => {
            menudb.lastInteraction = Date.now();
            console.log(`got to menus update point 10:${Date.now() - time}`);
            time = Date.now();
            menudb.save();
            console.log(`got to menus update point 11:${Date.now() - time}`);
            time = Date.now();
            // if (menudb.deleteAfter && menudb.deleteAfter > 0) {
            //   setTimeout(() => {
            //     MenuDeleteCheck({
            //       client: options.client,
            //       messageId: menudb.messageId || "",
            //     });
            //   }, menudb.deleteAfter * 1000);
            // }
          });
        } catch (e) {
          console.log("could not find message");
          return;
        }
      } else {
        console.log("something wrong with channel");
        return;
      }
    } catch (e) {
      console.log("could not find channel");
      return;
    }
  },
  delete: async (options: { messageId: string; client: Client }) => {
    let time = Date.now();
    const menu = await menuSchema.findOne({ messageId: options.messageId });
    console.log(`got to menus delete point 1:${Date.now() - time}`);
    time = Date.now();
    if (!menu) {
      console.log("the menu you are trying to delete was not found");
      return;
    }
    // if (menu.interaction[0] instanceof CommandInteraction) {
    //   console.log(`got to interaction delete`)
    //   try {
    //     menu.interaction[0].deleteReply();
    //   } catch (e) {
    //     console.log("something went wrong when deleting interaction reply");
    //   }
    //   menu.delete();
    //   return;
    // }
    try {
      console.log(`got to menus delete point 2:${Date.now() - time}`);
      time = Date.now();
      const channel = await options.client.channels.fetch(menu?.channelId || "");
      console.log(`got to menus delete point 3:${Date.now() - time}`);
      time = Date.now();
      if (channel instanceof DMChannel || channel instanceof TextChannel) {
        try {
          console.log(`got to menus delete point 4:${Date.now() - time}`);
          time = Date.now();
          channel.messages.fetch(menu.messageId || "").then((msg) => {
            console.log(`got to menus delete point 5:${Date.now() - time}`);
            time = Date.now();
            if (msg.deletable == true) {
              msg.delete();
              console.log(`got to menus delete point 6:${Date.now() - time}`);
              time = Date.now();
            }
          });
        } catch (e) {
          console.log("could not find message");
        }
      } else {
        console.log("something wrong with channel");
      }
    } catch (e) {
      console.log("could not find channel");
    }

    menu.delete();
    console.log(`got to menus delete point 7:${Date.now() - time}`);
    time = Date.now();
  },
};
async function MenuDeleteCheck(options: { messageId: string; client: Client }) {
  let time = Date.now();
  const menu = await menuSchema.findOne({ messageId: options.messageId });
  if (!menu) {
    console.log("the menu you are trying to delete was not found 2");
    return;
  }
  console.log(`got to menus check delete point 1:${Date.now() - time}`);
  time = Date.now();
  if ((menu.deleteAfter = 0)) {
    return;
  }
  if (!menu.lastInteraction || menu.deleteAfter) {
    return;
  }
  if (Date.now() - (menu.lastInteraction + menu.deleteAfter * 1000) > 0) {
    // if (menu.interaction[0] instanceof CommandInteraction) {
    //   try {
    //     console.log('got to delete 3 we are tesing')
    //     menu.interaction[0].deleteReply();
    //   } catch (e) {
    //     console.log("something went wrong when deleting interaction reply");
    //   }
    //   menu.delete();
    //   return;
    // }
    try {
      console.log(`got to menus check delete point 2:${Date.now() - time}`);
      time = Date.now();
      let channel = await options.client.channels.fetch(menu.channelId || "");
      if (channel instanceof DMChannel || channel instanceof TextChannel) {
        try {
          console.log(`got to menus check delete point 3:${Date.now() - time}`);
          time = Date.now();
          channel.messages.fetch(menu.messageId || "").then((msg) => {
            if (msg.deletable == true) {
              console.log(
                `got to menus check delete point 4:${Date.now() - time}`
              );
              time = Date.now();
              msg.delete();
            }
          });
        } catch (e) {
          console.log("could not find message");
        }
      } else {
        console.log("something wrong with channel");
      }
    } catch (e) {
      console.log("could not find channel");
    }
    console.log(`got to menus check delete point 5:${Date.now() - time}`);
    time = Date.now();

    menu.delete();
    console.log(`got to menus check delete point 6:${Date.now() - time}`);
    time = Date.now();
  } else {
    setTimeout(() => {
      MenuDeleteCheck({
        client: options.client,
        messageId: options.messageId,
      });
    },  (menu.lastInteraction + menu.deleteAfter * 1000) - Date.now());
  }
}
