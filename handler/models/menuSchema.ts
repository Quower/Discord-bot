import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
    channelId: {
      type: String,
      require: false,
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
        type: Array<string>,
        require: true
    },
    currentMenu: {
        type: String,
        require: true
    },
    SaveMenu: {
        type: Boolean,
        require: true
    },
    deleteAfter: {
        type: Number,
        require: true
    },
    waitinForResponse: {
        type: Boolean,
        require: true
    },
    lastInteraction: {
        type: Number,
        require: true
    },
  });
  
  export default mongoose.model("menu", menuSchema);
