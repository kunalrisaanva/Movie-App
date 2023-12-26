const mongoose = require("mongoose");


async function connectDb(url){
  const conecntionsInstance =  await mongoose.connect(url);
    console.log('db connected');
    console.log(`\n DB HOST : ${conecntionsInstance.connection.host}`);
}


module.exports = {
    connectDb
}