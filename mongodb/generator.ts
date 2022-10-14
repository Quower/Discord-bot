import mongoose from "mongoose"

const generatorSchema = new mongoose.Schema({
    chanelId : {
        type:  mongoose.SchemaTypes.Number,
        required : true,
    },
    guildId : {
        type:  mongoose.SchemaTypes.Number,
        required : true,
    }
})

export default mongoose.model('generator', generatorSchema)