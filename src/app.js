import  express from "express"
import session, { Cookie } from "express-session";
import cookieParser from  "cookie-parser";


const app = express();



app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));


app.use(express.json({limit:'16kb'}));
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"));
app.use(cookieParser());



// routes

import userRoutes from "./routes/user.routes.js"
import movieRoutes from "./routes/movie.routes.js";
import ratingRoutes from "./routes/rating.routes.js";
import reviewRoutes from "./routes/review.routes.js";



app.use("/api/v1/users", userRoutes);
app.use("/api/v1/movies", movieRoutes);
app.use("/api/v1/ratings", ratingRoutes);
app.use("/api/v1/reviews", reviewRoutes);


export { app }

