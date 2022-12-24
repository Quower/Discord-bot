import mongoose from "mongoose";
import { menuInfo } from "../typings";
const menuSchema = new mongoose.Schema({
    channelId: {
      type: String,
      require: true,
    },
    messageId: {
        type: String,
        require: false,
    },
    guildId: {
      type: String,
      require: false,
    },
    userIds: {
        type: Array<string>,
        require: false
    },
    inDms: {
        type: Boolean,
        requere: true
    },
    prevMenus: {
        type: Array<menuInfo>,
        require: false
    },
    currentMenu: {
        type: String,
        require: true
    },
    waitingForResponse: {
        type: Boolean,
        require: true
    },
    saveMenu: {
        type: Boolean,
        require: true
    },
    saveState: {
        type: Boolean,
        require: true
    },
    deleteAfter: {
        type: Number,
        require: true
    },
    lastInteraction: {
        type: Number,
        require: true
    },
  });
  
  export default mongoose.model("menu", menuSchema);

