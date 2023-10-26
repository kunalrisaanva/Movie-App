const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  rating: [
    {
      userId:String,
      ratings:String
    }
  ],
  reviews:[
    {
      userId:String,
      reviews:String
    }
  ],
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
