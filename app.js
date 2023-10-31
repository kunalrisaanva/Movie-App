require("dotenv").config();
const express = require("express");
const app = express();
const { connectDb } = require("./config/dbConnection");

connectDb(process.env.url);

// body parser

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/// db connection

// routes

const routes = require("./routes/routes");

app.use("/", routes);

// app.use((req, res, next) => {
//   res.setHeader('Authorization', 'YourHeaderValue');
//   next();
// });
// port listening

app.listen(process.env.PORT, () =>
  console.log(`server is running on PORT ${process.env.PORT}`)
);
