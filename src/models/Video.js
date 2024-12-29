const mongoose = require("mongoose")

const videoSchema = new mongoose.Schema({
    videoLink:{
        type:String,
        requried:true
    },
    videoName:{
        type:String,
        required:true
    },
    videoAlt:{
        type:String
    },
    imageLink:{
        type:String
    },
    imageAlt:{
        type:String
    },
    refCategory:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"
    }
})

const Video = mongoose.model("Video", videoSchema)

module.exports = Video