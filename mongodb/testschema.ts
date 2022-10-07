import mongoose from "mongoose"

const testSchema = new mongoose.Schema({
    number : {
        type:  mongoose.SchemaTypes.Number,
        required : true,
        default : 1
    }
})

export default mongoose.model('test', testSchema, 'test')