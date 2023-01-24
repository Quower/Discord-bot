import mongoose from "mongoose";
const optionsSchema = new mongoose.Schema({
  guildId: {
    type: String,
    require: true,
  },
  options: {
    type: Array,
    require: true,
  },
});

export default mongoose.model("options", optionsSchema);
