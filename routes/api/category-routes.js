const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: [Product]
  })
  // Send back a JSON response with status 200 and the data
  .then((categories) => res.status(200).json(categories))
  .catch((err) => {
    // Log any errors to the console and send a 500 status with error details
    console.error(err);
    res.status(500).json(err);
  })
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: { id: req.params.id },
    include: [Product],
  })
  .then((category) => {
    if (!category) {
      res.status(404).json({ message: 'No category found with that id' });
      return;
    }
    res.status(200).json(category);
  })
  .catch((err) => {
    // Log any errors to the console and send a 500 status with error details
    console.error(err);
    res.status(500).json(err);
  })
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
  .then((category) => res.status(200).json(category))
  .catch((err) => {
    console.error(err);
    // Potentially differentiate between different errors to determine which status code
    // is most appropriate
    if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
      res.status(400).json({ message: 'Invalid request data', details: err.errors });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: { id: req.params.id }
  })
  .then((category) => {
    if (!category) {
      res.status(404).json({ message: 'No category found with that id' });
      return;
    }
    res.status(200).json(category);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).json(err);
  })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: { id: req.params.id }
  })
  .then((category) => {
    if (!category) {
      // If no categories were deleted, respond with a 404 status
      res.status(404).json({ message: 'No category found with that id' });
      return;
    }
    // Confirm deletion with a success message
    res.status(200).json(category);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).json(err);
  })
});

// Export the configured router to use in other parts of the application
module.exports = router;
