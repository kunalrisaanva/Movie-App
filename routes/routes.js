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

const { verifyToken } = require("../middlewares/auth");


routes.post("/signup", userController.userSignup); // register route
routes.post("/login", userController.userLogin); // login user

routes.post("/movies/create", movieController.createMovie)

// protected routes

routes.get("/profile", userController.profile);
routes.post("/logout", userController.logout);

// movie  routes

routes.get("/movies", movieController.moviesList);
routes.get("/movie/:id", movieController.speceficMovie);
routes.post("/movies/:id/rate", movieController.rateMovie);
routes.get("/movies/:id/reviews", movieController.getReviews);

// user routes

routes.get("/users/:id", userController.user);
 
routes.get("/users/:id/ratings", userController.getRatedMovies);
routes.get("/users/:id/reviews", userController.getReview); 
routes.post("/reviews", movieController.createReview);
routes.get("/reviews/:id", movieController.specificReview);
routes.post("/reviews/:id/edit", movieController.editeExistReview);
routes.delete("/reviews/:id/delete", movieController.deleteReview);
routes.get("/search/movies:", movieController.searchMovie);
routes.get("/recomandation", movieController.recomondationMovie);
routes.get("/genres:", movieController.genres); 
routes.get("/actors:", movieController.actors);
routes.get("/directors:", movieController.directors);

module.exports = routes;
