const router = require('express').Router();
let Theater = require('../models/theater.model');

router.route('/').get((req, res) => {
  Theater.find()
    .then(theaters => res.json(theaters))
    .catch(err => res.status(400).json(`Error: ${err}`));
});
router.route('/:id').delete((req, res) => {
  Theater.findByIdAndDelete(req.params.id)
    .then(() => res.json(`Theater ${req.params.id} deleted`))
    .catch(err => res.status(400).json(`Error: ${err}`));
});
router.route('/add').post((req, res) => {
  const theaterId = req.body.theaterId;

  const newTheater = new Theater({theaterId});

  newTheater.save()
  .then(() => res.json('Theater added!'))
  .catch(err => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
