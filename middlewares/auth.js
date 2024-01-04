const jwt = require("jsonwebtoken");
require("dotenv").config();
const { User } = require("../models/allModel");

const secret_key = process.env.SECRET_KEY;

const verifyToken = async (req, res, next) => {
  try {
    const token =
      req.body.token ||
      req.session.user_session?.token ||
      req.headers["authorization"];

    if (!token) {
      res
        .status(200)
        .send({ success: false, msg: "token is required for authrization..." });
    } else {
      if (token === req.session.user_session?.token) {
        const decode = await jwt.verify(token, secret_key);

        req.user = decode;

        return next();
      } else {
        res.send({ msg: " token is not correct " }).status(401);
      }
    }
  } catch (error) {
    res.status(401).send("invalid token");
  }
};

module.exports = { verifyToken };
