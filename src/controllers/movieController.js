import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js";
import { Rating } from "../models/rating.model.js"
import { Movie } from "../models/movie.model.js";
import { isValidObjectId } from "mongoose";

// controller to Retrieve a list of movies.

const movie_list = asyncHandler( async(req,res) =>{
      
   const movies = await Movie.find().populate("actors genres directors")

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

   const movie = await Movie.findById(id)


   if(! movie) throw new ApiError(404 , "movie not found ");

   return res
   .status(200)
   .json(
      new ApiResponse(200, movie , " movie fetched successfully ")
   )
}) 



// Search for movies by title, genre, etc.

const searchMovie = asyncHandler( async(req,res) =>{

   const { title , genre  } = req.body
   
   const result = await  Movie.find({
      title: { $regex: new RegExp(title, 'i') },
      genres: { $regex: new RegExp(genre, 'i') }
    })
   
      return res
      .status(200)
      .json(
         new ApiResponse(200, result, " movie fetched successfully ")
      )
})





// recomandation movie // 

const recomandations = asyncHandler( async(req,res) =>{
   const recommendations = await Movie.find().sort({ createAt: -1 }).limit(10) 
   return res
   .status(200)
   .json(
      new ApiResponse(200, recommendations , " actors list fetched successfully ")
   )
})



//  Retrieve a list of genres

const genres = asyncHandler( async(req,res) =>{
   const genreList = await Movie.aggregate([
      {
        $unwind:"$genres"
      },

      {
         $group:{
            _id:null,
            genres:{
               $push:"$genres"
            }
         }
      }
   ])
   
   return res
   .status(200)
   .json(
      new ApiResponse(200, genreList[0].genres , " actors list fetched successfully ")
   )
})


// Retrieve a list of actors.

const actorsList = asyncHandler( async(req,res) =>{

   // const actorsList = await Movie.find().select( "actors")
   const actorsList = await Movie.aggregate([
      {
        $unwind:"$actors"
      },

      {
         $group:{
            _id:null,
            actors:{
               $push:"$actors"
            }
         }
      }
   ])
   
   return res
   .status(200)
   .json(
      new ApiResponse(200, actorsList[0].actors , " actors list fetched successfully ")
   )
})

// Retrieve a list of directors

const directorList = asyncHandler( async(req,res) =>{

   const directorsList = await Movie.aggregate([
      {
        $unwind:"$directors"
      },

      {
         $group:{
            _id:null,
            directors:{
               $push:"$directors"
            }
         }
      }
   ])
   return res
   .status(200)
   .json(
      new ApiResponse(200, directorsList[0].directors , " movie fetched successfully ")
   )
})






export {
   movie_list,
   getSpecificMovie,
   searchMovie,
   actorsList,
   directorList,
   createMovie,
   recomandations,
   genres,
}



