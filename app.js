require("dotenv").config();
const { connectDb } = require("./config/dbConnection");
/// db connection
connectDb(process.env.url);
const express = require("express");
const app = express();
const port = process.env.PORT ||  9000
// body parser

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// routes

const routes = require("./routes/routes");

app.use("/", routes);



// port listening

app.listen(port, () =>
  console.log(`server is running on PORT ${process.env.PORT}`)
);
