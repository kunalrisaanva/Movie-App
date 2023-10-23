const express = require("express");
const app = express();
require("dotenv").config();

// body parser

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/// db connection

const { connectDb } = require("./config/dbConnection");

connectDb(process.env.url);

// routes

const routes = require("./routes/routes");

app.use("/", routes);

// port listening

app.listen(process.env.PORT, () =>
  console.log(`server is running on PORT ${process.env.PORT}`)
);