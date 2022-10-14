import mongoose from "mongoose";

const generatorSchema = new mongoose.Schema({
  chanelId: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  guildId: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
});

export default mongoose.model("generator", generatorSchema);
