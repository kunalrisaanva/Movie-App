import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import { Rating } from "../models/rating.model.js"
import { Review } from "../models/review.model.js";
import { Movie } from "../models/movie.model.js";
import { isValidObjectId } from "mongoose";


// Rate a movie

const rate_movie = asyncHandler( async(req,res) =>{
    const { _id } = req.params  // movie id 
    const { rating } = req.body
    
    if(! isValidObjectId) throw new ApiError(401 , "Invalid Id")

    await Review.create({
        rating,
        owner:req.user?._id
    })

    return res
    .status(200)
    .json(
        new ApiResponse(200 , movieData ," reviews fetched successfully ")
    )

}) 




// Get rated movies for a user
const rated_movies = asyncHandler( async(req,res) =>{
    const { _id } = req.params // user id

    if(! isValidObjectId) throw new ApiError(401 , "Invalid Id")

    const movieData = await Rating.aggregate([
        {
            $match:{
                owner: new mongoose.TYpes.objectId(_id)
            }
        },

        {
            $lookup:{
                from:"videos",
                localField:"movie",
                foreignField:"_Id",
                as:"movie",
                pipeline:[
                    {
                        $project:{
                            title:1
                        }
                    }
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
        }
    ]) 

    if(movieData.length < 0) throw new ApiError(404, " something went wrong while collecting data ")


    return res
    .status(200)
    .json(
        new ApiResponse(200 , movieData ," reviews fetched successfully ")
    )


}) 







export {
    rate_movie,
    rated_movies
}