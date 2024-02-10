import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import { Movie } from "../models/movie.model.js" 
import { Review } from "../models/review.model.js"
import { mongoose , isValidObjectId} from "mongoose";

// Get reviews for a movie.

const movieReviews = asyncHandler( async(req,res) =>{
    const { id } = req.params //movie id 
    
    if( ! isValidObjectId(id)) throw new ApiError(400, "Invalid id");

    const movie = await Movie.exists({_id:id});

    if(! movie) throw new ApiError(404, " movie does not exists ");

    const movieData = await Review.aggregate([
        {
           $match:{
                movie: new mongoose.Types.ObjectId(id)
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
            $lookup:{
                from:"movies",
                localField:"movie",
                foreignField:"_id",
                as:"movies",
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
            $addFields:{
                owner:{
                    $first:"$owner"
                }
            }
        },

        {
            $addFields:{
                movies:{
                    $first:"$movies"
                }
            }
        }
    ]);

    if(movieData.length < 0) throw new ApiError(404," something went wrong while fetching data");


    return res
    .status(200)
    .json(
        new ApiResponse(200 , movieData ," reviews fetched successfully ")
    )

}) 



// Get movie reviews submitted by a user.
const getMovieReviews = asyncHandler( async(req,res) =>{
        const { id } = req.params // user id

        if(! isValidObjectId(id)) throw new ApiError(400, "Invalid Id")
        const user = await User.exists({_id:id});

        if(! user) throw new ApiError(404, " user does not exists");

        const movie = await Review.aggregate([
            {
                $match:{
                    owner: new mongoose.Types.ObjectId(id)
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
                $lookup:{
                    from:"movies",
                    localField:"movie",
                    foreignField:"_id",
                    as:"movies",
                    pipeline:[
                       {
                            $project:{
                               title:1,
                               review:1 
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
                    movies:{
                        $first:"$movies"
                    }
                }
            }
        ]);

        if(movie.length < 0) throw new ApiError(404, "something went wrong while collecting data ");

        return res
        .status(200)
        .json(
            new ApiResponse(200, movie , "movie reivew fecthed successfully")
        )




}) 


//  create new a review 
const createReview = asyncHandler( async(req,res) =>{
    const {movieId} = req.params
    const {review} = req.body
    
    if(! isValidObjectId(movieId)) throw new ApiError(401, "Invalid Id");
     

    const createdReview = await Review.create({
        review,
        movie:movieId,
        owner:req.user?._id
    });


    return res
    .status(201)
    .json(
        new ApiResponse(201, createdReview , "review created successfuly")
    )
}) 



// Get details of a specific review.
const getSpeceficReview = asyncHandler( async(req,res) =>{

    const { id } = req.params;   // review id 

    if(! isValidObjectId(id)) throw new ApiError(401 , "Invalid Id")

    const result = await Review.aggregate([
        {
            $match:{
                _id: new mongoose.Types.ObjectId(id)
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
            $lookup:{
                from:"movies",
                localField:"movie",
                foreignField:"_id",
                as:"movie",
                pipeline:[
                    {
                        $project:{
                            title:1,
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

    if( result.length < 0) throw new ApiError(404,"something went wrong while collecting data ")

    return res
    .status(201)
    .json(
        new ApiResponse(201, result , "review created successfuly")
    )


}) 



// Edit an existing review.
const editeExistReview = asyncHandler( async(req,res) =>{
    const { id } = req.params  // review id 
    const { review } = req.body

    if(! isValidObjectId(id)) throw new ApiError(401 , "Invalid Id")

    const updatedReview = await Review.findByIdAndUpdate(id , {
        $set:{
            review
        }
    },{new:true})

    return res
    .status(201)
    .json(
        new ApiResponse(201, updatedReview , "review created successfuly")
    )
}) 



// Delete a review.
const deleteReview = asyncHandler( async(req,res) =>{
    const { id } = req.params // review id 
    
    if(! isValidObjectId(id)) throw new ApiError(400, "Invalid Id ")

    await Review.findByIdAndDelete({_id:id});

    return res
    .status(201)
    .json(
        new ApiResponse(201, {} , "review Deleted successfuly")
    )
}) 


export {
    movieReviews,
    getMovieReviews,
    createReview,
    getSpeceficReview,
    editeExistReview,
    deleteReview
}