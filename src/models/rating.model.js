import mongoose  from "mongoose";



const ratingSchema = new mongoose.Schema({

    rating:{
        type:Number,
        required:true,
        min:[0, 'Rating must be at least 0'],
        max:[10, 'Rating cannot be more than 10']

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