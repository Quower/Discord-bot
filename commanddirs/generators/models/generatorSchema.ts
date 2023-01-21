import mongoose from "mongoose";

const generatorSchema = new mongoose.Schema({
  channelId: {
    type: mongoose.SchemaTypes.String,
    require: true,
  },
  guildId: {
    type: mongoose.SchemaTypes.String,
    require: true,
  },
});

export default mongoose.model("generator", generatorSchema);
