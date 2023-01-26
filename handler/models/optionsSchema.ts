import mongoose from "mongoose";
const settingsSchema = new mongoose.Schema({
  guildId: {
    type: String,
    require: true,
  },
  settings: {
    type: Array,
    require: true,
  },
});

export default mongoose.model("setting", settingsSchema);
