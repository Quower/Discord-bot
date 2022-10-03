import mongoose from "mongoose"

const coolSchema = new mongoose.Schema({
    number : {
        type : String,
        required : true,
        default : 0
    }
})

export default mongoose.model('test', coolSchema)