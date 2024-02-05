import mongoose from "mongoose";


const movieSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true,
    lowercase: true,
    uniqe: true,
    trim:true
  },


  actors:{
    type:[String],
    required:[true , "actors is required"]
  },


  directors:{
    type:[String],
    required:[true , "directors is required"]
  },

  genres:{
    type:[String],
    required:[true , "genre is required"]
  }



}, { timestamps:true });



export const Movie  =  mongoose.model("Movie", movieSchema);

