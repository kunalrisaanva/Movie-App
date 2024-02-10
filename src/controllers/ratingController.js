import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import { Rating } from "../models/rating.model.js"
import { Review } from "../models/review.model.js";
import { Movie } from "../models/movie.model.js";
import mongoose ,{ isValidObjectId } from "mongoose";


// Rate a movie

const rate_movie = asyncHandler( async(req,res) =>{
    const { id } = req.params  // movie id 
    
    const { rating } = req.body;

    const exitedRating = await Rating.exists({movie:id});
   
    if(exitedRating) throw new ApiError(401,"you have already rated this movie");


    if(! isValidObjectId(id)) throw new ApiError(401 , "Invalid Id");

    const movie = await Movie.exists({_id:id})

    if(! movie) throw new ApiError(404, "movie not found ");

    const createdRating = await Rating.create({
       rating,
       movie:id,
       owner:req.user?._id
    })

    return res
    .status(200)
    .json(
        new ApiResponse(200 , createdRating ," rate fetched successfully ")
    )

}) 




// Get rated movies for a user
const rated_movies = asyncHandler( async(req,res) =>{
    const { id } = req.params // user id
    
    if(! isValidObjectId(id)) throw new ApiError(401 , "Invalid Id");

    const exitedRating = await Rating

    const ratedMovieData = await Rating.aggregate([
        {
            $match:{
                owner: new mongoose.Types.ObjectId(id)
            }
        },

        {
            $lookup:{
                from:"movies",
                localField:"movie",
                foreignField:"_id",
                as:"movie",
                pipeline:[
                    {
                        $project:{
                            title:1
                        }
                    },
                ]
            }
        },

        {
            $lookup:{
                from:"users",
                localField:"owner",
                foreignField:"_id",
                as:"owner",
                pipeline:[
                    {
                       $project:{
                         username:1
                       } 
                    }
                ]
            }
        },

        {
            $addFields:{
                owner:{
                    $first:"$owner"
                }
            }
        },

        {
            $addFields:{
                movie:{
                    $first:"$movie"
                }
            }
        }
    ]) 

    if(ratedMovieData.length < 0) throw new ApiError(404, " something went wrong while collecting data ")

     
    return res
    .status(200)
    .json(
        new ApiResponse(200 , ratedMovieData ," reviews fetched successfully ")
    )


}) 







export {
    rate_movie,
    rated_movies
}