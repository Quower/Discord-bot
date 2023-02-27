import mongoose from "mongoose";

export interface menuI extends mongoose.Document {
  channelId: string,
  messageId: string,
  guildId?: string,
  userIds: any[],
  inDms: boolean,
  prevMenus: any[],
  currentMenu: string,
  waitingForResponse: boolean,
  saveMenu: boolean,
  saveState: boolean,
  deleteAfter: number,
  lastInteraction: number,
  data?: any,
  ephemeral?: number

};

export const menuSchema = new mongoose.Schema({
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
    require: true,
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

export default mongoose.model<menuI>("menu", menuSchema);
