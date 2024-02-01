import mongoose from "mongoose";



const reviewSchema = new mongoose.Schema ({

    review:{
        type:String,
        required:true
    },

    
    movie:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Movie"
    },

    owner:{
        type:mongoose.Schema.Types.ObjectId,
        // ref:"User"
    }

},{ timeStamp:true });


export const Review = mongoose.model("Review",reviewSchema); 