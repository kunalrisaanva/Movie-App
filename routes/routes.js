const express = require("express");

const routes = express.Router();

//express-session

const sessions = require("express-session");
const cookieParser = require("cookie-parser")
const oneDay = 1000 * 60 * 60 * 24;
routes.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));

routes.use(cookieParser());

// controolers

const {
  userController,
  movieController,
} = require("../controllers/allController");

const {verifyToken} = require("../middlewares/auth");



routes.post("/signup", userController.userSignup);// register route
routes.post("/login", userController.userLogin); // login user

routes.post("/movies/create", movieController.createMovie)

// protected routes

routes.get("/profile",verifyToken, userController.profile);
routes.post("/logout",verifyToken, userController.logout);

// movie  routes

routes.get("/movies",verifyToken, movieController.moviesList);
routes.get("/movie/:id",verifyToken, movieController.speceficMovie);

routes.post("/movies/:id/rate",verifyToken, movieController.rateMovie);

routes.get("/movies/:id/reviews",verifyToken, movieController.getReviews);

// user routes

routes.get("/users/:id",verifyToken, userController.user);
 
routes.get("/users/:id/ratings",verifyToken, userController.getRatedMovies);
routes.get("/users/:id/reviews",verifyToken, userController.getReview); 
routes.post("/review/:id",verifyToken, movieController.createReview);

routes.get("/reviews/:id",verifyToken, movieController.specificReview);
routes.post("/reviews/:id/edit",verifyToken, movieController.editeExistReview);
routes.delete("/reviews/:id/delete",verifyToken, movieController.deleteReview);

routes.get("/search/movies:",verifyToken, movieController.searchMovie);
routes.get("/recomandation",verifyToken, movieController.recomondationMovie);

routes.get("/genres:",verifyToken, movieController.genres); 
routes.get("/actors:",verifyToken, movieController.actors);
routes.get("/directors:",verifyToken, movieController.directors);


module.exports = routes;
