import mongoose from "mongoose";

const generatorSchema = new mongoose.Schema({
  channelId: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  guildId: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
});

exports.generatorSchema = mongoose.model("generator", generatorSchema);