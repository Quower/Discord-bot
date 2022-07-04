import mongoose from "mongoose"

const Vuu = new mongoose.Schema({
    number : {
        type : Number,
        required : true,
        default : 0
    }
})

export default mongoose.model('Vuu', Vuu, 'Vuu')