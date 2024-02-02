import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js";
import { Movie } from "../models/movie.model.js";
import { isValidObjectId } from "mongoose";

// controller to Retrieve a list of movies.

const movie_list = asyncHandler( async(req,res) =>{
      
   const movies = await Movie.find().select(" -createdAt -updatedAt ");

   if(! movies) throw new ApiError(404, "something went wrong while feching");

   return res
   .status(200)
   .json(
      new ApiResponse(200 , movies , "movies list fecthed successfully")
   )

}) 



// // Get details of a specific movie.

const getSpecificMovie = asyncHandler( async(req,res) =>{
   const { id } = req.params
 
  if(! isValidObjectId(id)) throw new ApiError(404 , "Invalid Id ");

   const movie = await Movie.findById(id).select(" -createdAt -updatedAt ")
   if(! movie) throw new ApiError(404 , "movie not found ");

   return res
   .status(200)
   .json(
      new ApiResponse(200, movie , " movie fetched successfully ")
   )
}) 



// Search for movies by title, genre, etc.

const searchMovie = asyncHandler( async(req,res) =>{
   
   const { title , actors } = req.body
   const searchData = await Movie.find({
         $or:[
            { title: { $regex: title, $options: 'i' } },
            
         ]
      })

      return res
      .status(200)
      .json(
         new ApiResponse(200, searchData , " movie fetched successfully ")
      )
})


// Retrieve a list of actors.

const actorsList = asyncHandler( async(req,res) =>{

   const actorsList = await Movie.find().select(" -title -directors -genres -createdAt -updatedAt")
   
   return res
   .status(200)
   .json(
      new ApiResponse(200, actorsList , " actors list fetched successfully ")
   )
})

// Retrieve a list of directors

const directorList = asyncHandler( async(req,res) =>{

   const directorsList = await Movie.find().select(" -title -actors -genres -createdAt -updatedAt")

   return res
   .status(200)
   .json(
      new ApiResponse(200, directorsList , " movie fetched successfully ")
   )
})


// create movie 

const createMovie = asyncHandler( async(req,res) =>{
   
   const {title , genres , actors , directors} = req.body

   const movie = await Movie.create({
       title,
       genres,
       actors,
       directors
   })

   return res
   .status(200)
   .json(
      new ApiResponse(201, movie , " movie fetched successfully ")
   )


})



export {
   movie_list,
   getSpecificMovie,
   searchMovie,
   actorsList,
   directorList,
   createMovie
}



