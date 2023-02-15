import mongoose from "mongoose";
import { menuInfo } from "../typings";
const menuSchema = new mongoose.Schema({
  channelId: {
    type: String,
    require: true,
  },
  messageId: {
    type: String,
    require: true,
  },
  guildId: {
    type: String,
    require: false,
  },
  userIds: {
    type: Array,
    require: false,
  },
  inDms: {
    type: Boolean,
    requere: true,
  },
  prevMenus: {
    type: Array,
    require: false,
  },
  currentMenu: {
    type: String,
    require: true,
  },
  waitingForResponse: {
    type: Boolean,
    require: true,
  },
  saveMenu: {
    type: Boolean,
    require: true,
  },
  saveState: {
    type: Boolean,
    require: true,
  },
  deleteAfter: {
    type: Number,
    require: true,
  },
  lastInteraction: {
    type: Number,
    require: true,
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
    require: false,
  },
  ephemeral: {
    type: Number,
    require: false,
  },
});

export default mongoose.model("menu", menuSchema);
