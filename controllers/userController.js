const { User, Movie } = require("../models/allModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

//  password hash

async function passwordHash(password) {
  try {
    const newHashPassword = await bcrypt.hash(password, 10);
    return newHashPassword;
  } catch (error) {
    console.log(error.message);
  }
}

// create token

async function createToken(id) {
  
  const token = await jwt.sign({ _id: id }, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });
  return token;
}

/// register user

const userSignup = async (req, res) => {
  try {
    const { username, password , id} = req.body;

    const user = await User.findOne({ username: username });
    if (user) {
      res.status(400).send({ msg: "this user aleady exist" });
    } else {
      const newHashPassword = await passwordHash(password);

      const user = new User({
        username,
        password: newHashPassword,
        id
      });

      const userData = await user.save();

      res.status(200).send({ status: "sucess", user: userData });
      res.end();
    }
  } catch (error) {
    res.status(404).send({ msg: error.message });
  }
};

// user login

const userLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username: username });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const token = await createToken(user._id);

        const userUpdateData = await User.findByIdAndUpdate(
          { _id: user._id },
          {
            $set: {
              username: user.username,
              password: user.password,
              token: token,
            },
          },
          { new: true }
        );

        const session = req.session;
        session.user_session = userUpdateData;
      

        res
          .send({
            user: userUpdateData,
            msg: "login daata",
          })
          .status(200);
      } else {
        res.status(400).send({ msg: "password does not match " });
      }
    } else {
      res.status(400).send({ msg: "user does not exist " });
    }
    res.end();
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
};

//logout

const logout = async (req, res) => {
  try {
 
    const user = await User.findOne({
      username: req.session.user_session.username,
    });
  

    const updateToken = await User.updateOne(
      { username: user.username },
      { $set: { token: "" } }
    );

    req.session.destroy();

    //    console.log(req.session.user_session)
    res.send("logout succesfully").status(200);
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
};

// for auth test

const user = async (req, res) => {
  try {

    const id = req.params.id || req.body.id
  
   
    const user = await User.findById({_id:id});

  
    res.send({ msg: "sucesss", user: user }).status(200);
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
};


// Rate a movie

const getRatedMovies = async (req, res) => {
  try {
    const  user_id  = req.params.id || req.body.id
    // console.log(user_id)
    const movie = await Movie.find({ user_id: user_id });
    const dataMove = movie.map((data) => {
      return data;
    });

    res.send({ msg: "sucess", data: dataMove }).status(200);
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
};

// Get reviews for a movie

const getReview = async (req, res) => {
  try {
    const user_id  = req.body.id || req.params.id

    const movie = await Movie.find({ user_id: user_id });
    
    const movieData = movie.map((data) => {
      return data.reviews;
    });
    
    res
      .send({ msg: "sucess,'this user all reviews ", review: movieData })
      .status(200);
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
};


const profile = async (req, res) => {
  try {
    const review = await Movie.findById();
    res.send("profile").status(200);
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
};

module.exports = {
  userSignup,
  userLogin,
  profile,
  logout,
  user,
  getRatedMovies,
  getReview,
};
