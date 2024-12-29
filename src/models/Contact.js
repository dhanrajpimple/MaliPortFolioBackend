const mongoose = require("mongoose")

const contactSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
    },
    message:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const Contact = mongoose.model("Contact", contactSchema);
module.exprots = Contact
