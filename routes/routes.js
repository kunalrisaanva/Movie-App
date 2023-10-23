const express = require("express");

const routes = express.Router();

//express-session

const express_session = require("express-session");

routes.use(
  express_session({
    secret: "secretkey",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 300000 },
  })
);

// controolers

const {
  userController,
  movieController,
} = require("../controllers/allController");

const { verifyToken } = require("../middlewares/auth");
const session = require("express-session");

routes.post("/signup", userController.userSignup); // register route
routes.post("/login", userController.userLogin); // login user

// protected routes

routes.get("/profile", verifyToken, userController.profile);
routes.post("/logout", verifyToken, userController.logout);

// movie  routes

routes.get("/movies", movieController.moviesList);
routes.get("/movies/:id", movieController.speceficMovie);
routes.get("/movies/:id/rate", movieController.rateMovie);
routes.get("/movies/movies/:id/reviews", movieController.getReviews);

// user routes

routes.get("/users/:id", userController.user);

routes.get("/users/:id/ratings", userController.getRatedMovies);
routes.get("/users/:id/reviews", userController.getReview);
routes.post("/reviews", movieController.createReview);
routes.get("/reviews/:id", movieController.specificReview);
routes.post("/reviews/:id/edit", movieController.editeExistReview);
routes.get("/reviews/:id/delete", movieController.deleteReview);
routes.get("/search/movies", movieController.searchMovie);
routes.get("/recomandation", movieController.recomondationMovie);
routes.get("/genres", movieController.genres);
routes.get("/actors", movieController.actors);
routes.get("/directors", movieController.directors);

module.exports = routes;
