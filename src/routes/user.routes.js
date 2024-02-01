import { Router } from "express";
import {
  userSignup,
  userLogin,
  logout,
  getUserDetails,
  refreshAcessToken  

} from "../controllers/userController.js"

import { verifyJwt } from "../middlewares/auth.middleware.js"
const routes = Router();


routes.route("/signup").post(userSignup); // register route
routes.route("/login").post(userLogin); // login user

// protected routes

routes.route("/get-user-details").get( verifyJwt, getUserDetails );
routes.route("/logout").post(verifyJwt , logout);
routes.route("/refresh-Token").post(refreshAcessToken);




// routes.post("/movies/create", movieController.createMovie)









 









export default routes
