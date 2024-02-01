import { Router } from "express"
import {
    rate_movie,
    rated_movies
} from "../controllers/ratingController.js"

import { verifyJwt } from "../middlewares/auth.middleware.js";
const router = Router();

// routes.get("/users/:id/ratings",verifyToken, userController.getRatedMovies);
// routes.post("/movies/:id/rate",verifyToken, movieController.rateMovie);

router.use( verifyJwt );

router.route("/movies/:id/rate").post(rate_movie);
router.route("/users/:id/ratings").get(rated_movies);



export default router