const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const awardSchema = new Schema({
  wins: { type: Number },
  nominations: { type: Number },
  text: { type: String, trim: true }
});
const imdbSchema = new Schema({
  rating: { type: mongoose.Decimal128 },
  votes: { type: Number },
  id: { type: Number }
});
const tomatoViewerSchema = new Schema ({
  rating: { type: Number },
  numReviews: { type: Number },
  meter: { type: Number }
});
const tomatoSchema = new Schema({
  viewer: { type: tomatoViewerSchema },
  production: { type: String },
  lastUpdated: { type: Date }
});
const movieSchema = new Schema({
      plot: { type: String, trim: true },
      genres: { type: [String] },
      runtime: { type: Number },
      cast: { type: [String] },
      title: { type: String, trim: true },
      fullplot: { type: String, trim: true },
      languages: { type: [String] },
      released: { type: Date },
      directors: { type: [String] },
      writers: { type: [String] },
      awards: { type: awardSchema },
      lastupdated: { type: String },
      year: { type: Number },
      imdb: { type: imdbSchema },
      countries: { type: [String] },
      type: { type: String },
      tomatoes: { type: tomatoSchema }
}, {
  timestamps: true
});

const Movie = mongoose.model('Movies', movieSchema);

module.exports = Movie;
