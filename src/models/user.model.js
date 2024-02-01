import mongoose from "mongoose";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
    
    username:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true
    },

    password:{
        type:String,
        required:true,
        // lowercase:true
    },
    refreshToken :{
        type:String,
    },
  
}, { timestamps: true });



// password hash 

userSchema.pre("save", async function(next){
    if(! this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password,10)
    next()
})





// is Password match

userSchema.methods.isPasswordMatch = async function(password){

    const isMatch =  await bcrypt.compare(password,this.password);
    
    return isMatch
}


// genrate accessToken 

userSchema.methods.genrateAccessToken = function(){
    return jwt.sign(
        {_id:this._id},
        process.env.ACCES_tOKEN_SECRET,
        {expiresIn:process.env.ACCRESS_TOKEN_EXPIRY}
    )
}

// genrate refreshToken 


userSchema.methods.genraterefreshToken = function(){
    return jwt.sign(
        {_id:this._id},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn:process.env.REFRESH_TOKEN_EXPIRY}
    )
}




export const User =  mongoose.model("User",userSchema);