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

routes.get("/movies",verifyToken, movieController.moviesList);
routes.get("/movies/:id",verifyToken, movieController.speceficMovie);
routes.get("/movies/:id/rate",verifyToken, movieController.rateMovie);
routes.get("/movies/movies/:id/reviews",verifyToken, movieController.getReviews);

// user routes

routes.get("/users/:id",verifyToken, userController.user);

routes.get("/users/:id/ratings",verifyToken, userController.getRatedMovies);
routes.get("/users/:id/reviews",verifyToken, userController.getReview);
routes.post("/reviews",verifyToken, movieController.createReview);
routes.get("/reviews/:id",verifyToken, movieController.specificReview);
routes.post("/reviews/:id/edit",verifyToken, movieController.editeExistReview);
routes.get("/reviews/:id/delete",verifyToken, movieController.deleteReview);
routes.get("/search/movies",verifyToken, movieController.searchMovie);
routes.get("/recomandation",verifyToken, movieController.recomondationMovie);
routes.get("/genres",verifyToken, movieController.genres);
routes.get("/actors",verifyToken, movieController.actors);
routes.get("/directors",verifyToken, movieController.directors);

module.exports = routes;
