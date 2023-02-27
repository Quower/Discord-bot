import mongoose from "mongoose";
const modalSchema = new mongoose.Schema({
  modalName: {
    type: String,
    require: true,
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
    require: false,
  },
});

export default mongoose.model("modal", modalSchema);
