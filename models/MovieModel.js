const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  rating: {
    type: String,
    required: true,
  },
  reviews: {
    type: String,
    required: true,
  },
  genres: {
    type: String,
    required: true,
  },
  actors: {
    type: String,
    required: true,
  },
  directors: {
    type: String,
    required: true,
  },
});

// director
// actor

module.exports = mongoose.model("Movie", movieSchema);
