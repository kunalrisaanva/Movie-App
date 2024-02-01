import { Router } from "express"
import {
    movieReviews,
    getMovieReviews,
    createReview,
    getSpeceficReview,
    editeExistReview,
    deleteReview
} from "../controllers/reviewController.js"

import { verifyJwt } from "../middlewares/auth.middleware.js";
const router = Router();

router.use(verifyJwt);


router.route("/reviews/:movieId").post(createReview);
router.route("/movies/:id/reviews").get(movieReviews);
router.route("/users/:id/reviews").get(getMovieReviews);
router.route("/reviews/:id").get(getSpeceficReview);
router.route("/reviews/:id/edit").get(editeExistReview);
router.route("/reviews/:id/deleted").get(deleteReview);


export default router