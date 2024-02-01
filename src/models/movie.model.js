import mongoose from "mongoose";


const movieSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true,
    lowercase: true,
    uniqe: true,
    trim:true
  },
  
  actors: {
    type:[String],
    required:true
  },

  directors:  {
    type:[String],
    required:true
  },

  genres:  {
    type:[String],
    required:true
  },

}, { timestamps:true });



export const Movie  =  mongoose.model("Movie", movieSchema);

