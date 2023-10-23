const mongoose = require("mongoose");


async function connectDb(url){
    await mongoose.connect(url)
    console.log('db connected')
}


module.exports = {
    connectDb
}