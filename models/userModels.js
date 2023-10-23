const mongoose = require("mongoose");



const userSchema = mongoose.Schema({
    
    id:{
        type:Number,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    token:{
        type:String,
        default:""
    },
    
})

module.exports =  mongoose.model("User",userSchema)