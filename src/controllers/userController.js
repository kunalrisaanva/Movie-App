import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import jwt from "jsonwebtoken"

// genrate accessToken and refresToken 
const genrateAccessAndRefreshTokens = async userId => {
    try {
        
        const user = await User.findById(userId);
        const accesToken = user.genrateAccessToken()
        const refreshToken = user.genraterefreshToken();
        
        user.refreshToken = refreshToken

        await user.save({ validateBeforeSave:false })

        return { accesToken , refreshToken }


    } catch (error) {
        throw new ApiError(500, " Something went wrong creating refresh and access token ");
    }
};


 
// register user

const userSignup = asyncHandler( async(req,res) => {

    const { username, email , password } = req.body;
    console.log(email)
    if( [ username ,email, password ].some( fields => fields.trim() === "" || undefined)){
        throw new ApiError(400 , " required All fields ")
    }

    const existedUser = await User.findOne({
        $or:[
            {username},
            {email}
        ]
    });

    if( existedUser ) throw new ApiError(400, " user is already exists ");

    const user = await User.create({
        username,
        email,
        password
    })
    console.log(user)
    
    const createdUser = await User.findById(user._id).select(" -createdAt -updatedAt ")

    return res
    .status(201)
    .json(
         new ApiResponse(201, createdUser , " user created successfully ")
    )



})


// user login

const userLogin = asyncHandler( async(req,res) => {

     const {username , email , password } = req.body;

     if(! username && ! email) throw new ApiError(400 , ' please fill all fields ');

     const user = await User.findOne({
        $or:[
            {username},{email}
        ]
     })

     if(!user) throw new ApiError(404 , " this user does not exists ");

     const isPasswordMatch = await user.isPasswordMatch(password);

     if(! isPasswordMatch) throw new ApiError(400 , " user credintails are wrong ");

    
    const { accesToken, refreshToken } = await genrateAccessAndRefreshTokens(user?._id);


    const loggedInUser = await User.findById(user?._id).select(" -password -refreshToken ")

    req.session.tokens = {accesToken , refreshToken}  // set token into session storage

    req.session.save()
    
     return res 
     .status(200)
     .json(
        new ApiResponse(200 
            , {
                user:loggedInUser,
                accesToken,
                refreshToken
              } 
            ," user fectched successfully ")
     )
})


// //logout

const logout = asyncHandler( async(req,res) => {

    
    await User.findByIdAndUpdate(req.user?._id,{
        $unset:{
            refreshToken:1
        },
    })

    req.session.destroy()

    return res
    .status(200)
    .json(
       new ApiResponse(200 ,
           {}
           ," user logged out ")
    )

    
})


// refreshToken  optional 

const refreshAcessToken = asyncHandler( async(req,res) =>{
    // console.log()
    const incomingRefreshToken =
    req.session?.tokens.refreshToken || req.body.refreshToken;

if (!incomingRefreshToken) {
    throw new ApiError(401, " Unauthrized Request ");
}
try {
    const decodedToken =  jwt.verify(
        incomingRefreshToken,
        process.env.REFRESH_TOKEN_SECRET,
    );
        
    const user = await User.findById(decodedToken?._id);
    
    if (!user) {
        throw new ApiError(401, " Invalid Refresh Token ");
    }
    
    if (incomingRefreshToken !== user?.refreshToken) {
        throw new ApiError(401, "  Refresh Token is Expired or used  ");
    }

    const { accesToken, refreshToken } = await genrateAccessAndRefreshTokens(
        user._id
    );

    req.session.tokens = {accesToken , refreshToken} // set token into session storage 

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { accesToken, refreshToken },
                "refresh Token refreshed"
            )
        );
} catch (error) {
    throw new  ApiError(401, error?.message || " Invalid refresh token ");
}

})




 // get Current User 

 const getUserDetails = asyncHandler( async(req,res) => {
    
    const user = await User.findById(req.user?._id).select("-password -accessToken -refreshToken")

     return res
     .status(200)
     .json(
        new ApiResponse(200, user , " user fecthed successully ")
     )
 })

 

 export {
    userSignup,
    userLogin,
    logout,
    getUserDetails,
    refreshAcessToken
    
 }