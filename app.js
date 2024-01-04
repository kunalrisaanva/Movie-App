require('dotenv').config()
const { connectDb } = require("./config/dbConnection");
/// db connection
connectDb()

const express = require("express");
const app = express();

const sessions = require("express-session");
const cookieParser = require("cookie-parser")
const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: process.env.SECRET,
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));

app.use(cookieParser());

const port = process.env.PORT ||  9000


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
