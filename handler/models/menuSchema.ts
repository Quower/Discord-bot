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
    userIds: {//llllllllllllllllll
        type: Array,
        require: false
    },
    inDms: {//llllllllllllllllll
        type: Boolean,
        requere: true
    },
    prevMenus: {//llllllllllllllllll
        type: Array,
        require: false
    },
    currentMenu: {//llllllllllllllllll
        type: String,
        require: true
    },
    waitingForResponse: {//llllllllllllllllll
        type: Boolean,
        require: true
    },
    saveMenu: {//llllllllllllllllll
        type: Boolean,
        require: true
    },
    saveState: {//llllllllllllllllll
        type: Boolean,
        require: true
    },
    deleteAfter: {//llllllllllllllllll
        type: Number,
        require: true
    },
    lastInteraction: {
        type: Number,
        require: true
    },
  });
  
  export default mongoose.model("menu", menuSchema);

