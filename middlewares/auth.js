const jwt = require("jsonwebtoken");
require("dotenv").config();
const { User } = require("../models/allModel");


const secret_key = process.env.SECRET_KEY

const verifyToken = async(req,res,next) => {

    try {

   const token = req.body.token || req.query.token || req.headers["authorization"];

   if(!token){

       res.status(200).send({success:false,msg:"token is required for authrization..."});

   }else{

        const tokenFromServer = await User.findOne({username:req.session.user_session.username});

        if(token === tokenFromServer.token){

            const decode  = await jwt.verify(token,secret_key);

            req.user = decode;
            return next();

        }
     
   }
  } catch (error) {

   res.status(401).send("invalid token");
   
  }
}; 


  


module.exports = { verifyToken }


