const router = require('express').Router();
let Movie = require('../models/movie.model');

router.route('/').get((req, res) => {
  Movie.find({}, {title: 1,plot:1,runtime:1,type:1,cast:1})
    .then(movies => res.json(movies))
    .catch(err => res.status(400).json(`Error: ${err}`));
});
router.route('/:id').delete((req, res) => {
  Movie.findByIdAndDelete(req.params.id)
    .then(() => res.json(`Movie ${req.params.id} deleted`))
    .catch(err => res.status(400).json(`Error: ${err}`));
});
router.route('/add').post((req, res) => {
   const title = req.body.title;

   const newMovie = new Movie({title});

   newMovie.save()
   .then(() => res.json('Movie added!'))
   .catch(err => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
