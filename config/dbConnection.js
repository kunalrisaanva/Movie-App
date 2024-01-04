const mongoose  = require("mongoose");
const dbName = "movie"

async function connectDb(url){
    
  try {
     const connectionInstence =  await mongoose.connect(`${process.env.MONGO_URL}/${dbName}`)
     console.log(`\n Database Connected !! Db HOST ${connectionInstence.connection.host}`);
  } catch (error) {
    console.log("MONGODB CONNECTION ERROR!",error);
  }
    
}


module.exports = {
    connectDb
}