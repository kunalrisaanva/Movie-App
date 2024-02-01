import mongoose  from "mongoose";



const ratingSchema = new mongoose.Schema({

    rating:{
        type:String,
        required:true
    },

    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },


    movie:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Movie"
    }

}, { timestamps:true });



export const Rating = mongoose.model("Rating",ratingSchema); 