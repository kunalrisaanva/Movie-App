import { mongoose } from "mongoose";
import { dbName } from "../constant.js";

async function connectDb(url){
    
  try {
     const connectionInstence =  await mongoose.connect(`${process.env.MONGO_URL}/${dbName}`)
     console.log(`\n Database Connected !! Db HOST ${connectionInstence.connection.host}`);
  } catch (error) {
    console.log("MONGODB CONNECTION FAILED !",error)
    process.exit(1)
  }
    
}


export { connectDb }