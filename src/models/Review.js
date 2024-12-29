const mongoose = require("mongoose")

const reviewSchema = new mongoose.Schema({
    customerName:{
        type: String,
        required:true
    },
    star:{
        type:Number,
        min:0,
        max:5
    },
    message:{
        type:String
    },
    videoCategory:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"
    }
})

const Review = mongoose.model("Review", reviewSchema)