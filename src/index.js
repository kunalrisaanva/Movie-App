import dotenv from "dotenv"
import { app } from "./app.js";
import { connectDb } from "./db/dbConnection.js";

dotenv.config({
    path:'./.env'
})

// db connection 

connectDb()
.then( () => {
    app.listen(process.env.PORT || 5000 , () => {
        console.log(` Server is running on PORT ${process.env.PORT}`)
    })

    app.on("error", (err) => {
        console.log("ERROR !! ", err)
      });

})

.catch((error) => {
    console.log(`MONGODB CONNECTION ERROR !!`,error)
})

