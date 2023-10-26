const { Movie } = require("../models/allModel");

// Retrieve a list of movies.

const moviesList = async (req, res) => {

  try {
   const data = req.params.id
   console.log(data)
    const movies = await Movie.find();

    res.status(200).send({ status: "sucess", movies: movies });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
};

// Get details of a specific movie. 

const speceficMovie = async (req, res) => {
  try {

    // const id = req.body.id || rs

    const id  = req.params.id || req.body
    

    const movies = await Movie.findById({_id:id});

    res.status(200).send({ status: "sucess", movies: movies });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
};



// Get rated movies for a user

const rateMovie = async (req, res) => {
  try {
    const id = req.params.id || req.body.rate
    const rate = req.body.rate || req.params.rate
  
    const movie = await Movie.findByIdAndUpdate(
      { _id: id },
      { $set: { rating: rate } },
      { new: true }
    );

    res.status(200).send({ status: "sucess", movies: movie });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
};

// Get movie reviews submitted by a user

const getReviews = async (req, res) => {
  try {
    const { _id } = req.body;
    console.log(_id);

    const movie = await Movie.findById(_id);

    res.status(200).send({ status: "sucess", reviews: movie.reviews });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
};

// Create a new review.

const createReview = async (req, res) => {
  try {
    const { user_id, reviews, title, rating } = req.body;
    const result = await Movie({ user_id, reviews, title, rating });
    const data = await result.save();

    res.status(200).send({ msg: "you have created this review ", data: data });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
};

//  Get details of a specific review..

const specificReview = async (req, res) => {
  try {
    const id  = req.body.id || req.params.id
    console.log(id)
    const movie = await Movie.findById({_id:id});
    
    res.status(200).send({ msg: "Here is the data you want  ", data: movie });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
};

// Edit an existing review.

const editeExistReview = async (req, res) => {
  try {
    const  review  = req.body.review || req.body.params
    const _id = req.params.id || req.body.id
   
    const movie = await Movie.findByIdAndUpdate(
      { _id: _id },
      { $set: { reviews: review } },
      { new: "true" }
    );

    res.status(200).send({ msg: "you have created this review ", data: movie });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
};

// Delete a review.

const deleteReview = async (req, res) => {
  try {
    const _id = req.body.id || req.params.id
    console.log(_id);
    const movie = await Movie.findByIdAndDelete({ _id: _id });

    res.status(200).send({ msg: `deleteed ${movie.title}` });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
};

// search point

const searchMovie = async (req, res) => {
  try {
    const { title, genres } = req.body || re

    const movie = await Movie.find({
      $or: [{ title: title }, { genres: genres }],
    });

    res.status(200).send({ msg: "here is the movie", movieData: movie });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
};

// Get movie recommendations for a user based on their preferences.

const recomondationMovie = async (req, res) => {
  try {
    const prefrence = req.body.prefrence;

    const movieData = await Movie.find({ genres: prefrence });

    res.send({ msg: "here is the movies", data: movieData });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
};

// Miscellaneous Endpoints:

// funtion that remove same value in object ;

function removeDuplicateValues(obj) {
  const uniqueValues = {}; // Initialize an empty object to store unique values
  const newObj = {}; // Initialize a new object to store the result

  for (const key in obj) {
    const value = obj[key];

    // Check if the value is not already in the uniqueValues object
    if (!uniqueValues.hasOwnProperty(value)) {
      newObj[key] = value; // Add the unique value to the new object
      uniqueValues[value] = true; // Mark the value as seen in the uniqueValues object
    }
  }

  return newObj;
}

// Retrieve a list of available genres

const genres = async (req, res) => {
  try {

    const genresData = await Movie.find()
    const data = genresData.map((data, i) => {
      return data.genres
    })



    const uniqueObject = removeDuplicateValues(data);
    console.log(uniqueObject)
    res
      .send({ msg: "here is the availble genres ", data: uniqueObject })
      .status(200);
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
};



// Retrieve a list of actors.

const actors = async (req, res) => {
  try {

    const genresData = await Movie.find()
    const data = genresData.map((data, i) => {
      return data.actors
    })
    const uniqueObject = removeDuplicateValues(data);
    res.send({ msg: "here is the availble actors ", data: uniqueObject });

    res.status(200);
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
};

//  Retrieve a list of directors.

const directors = async (req, res) => {
  try {
    const genresData = await Movie.find()
    const data = genresData.map((data, i) => {
      return data.directors
    })

    const uniqueObject = removeDuplicateValues(data);

    res.send({ msg: "here is the availble directors ", data: uniqueObject }).status(200)
    // res.json(uniqueObject);
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
};

module.exports = {
  moviesList,
  speceficMovie,
  rateMovie,
  getReviews,
  createReview,
  specificReview,
  editeExistReview,
  deleteReview,
  searchMovie,
  recomondationMovie,
  genres,
  actors,
  directors,
};
