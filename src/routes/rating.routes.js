import { Router } from "express"
import {
    rate_movie,
    rated_movies
} from "../controllers/ratingController.js"

import { verifyJwt } from "../middlewares/auth.middleware.js";
const router = Router();


router.use( verifyJwt );

router.route("/movies/:id/rate").post(rate_movie);
router.route("/users/:id/ratings").get(rated_movies);



export default router