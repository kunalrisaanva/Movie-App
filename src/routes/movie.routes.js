import { Router } from "express"
import {
    movie_list,
    getSpecificMovie,
    searchMovie,
    actorsList,
    directorList,
    recomandations,
    genres,
    // genrategenrase
} from "../controllers/movieController.js";

import { verifyJwt } from "../middlewares/auth.middleware.js";
const router = Router();

router.use( verifyJwt );


router.route("/movies").get(movie_list);
router.route("/movies/:id").get(getSpecificMovie);
router.route("/search/movies").get(searchMovie);
router.route("/recommendations").get(recomandations);
router.route("/genres").get(genres);
router.route("/actors").get(actorsList);
router.route("/directors").get(directorList);






export default router