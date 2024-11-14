const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: [{ model: Product, through: ProductTag }],
  })
  // Send back a JSON response with status 200 and the data
  .then((tags) => res.status(200).json(tags))
  .catch((err) => {
    // Log any errors to the console and send a 500 status with error details
    console.error(err);
    res.status(500).json(err);
  })
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: { id: req.params.id },
    include: [{ model: Product, through: ProductTag }]
  })
  .then((tag) => {
    if (!tag) {
      res.status(404).json({ message: 'No tag found with this id' });
      return;
    }
    // Send back a JSON response with status 200 and the data
    res.status(200).json(tag);
  })
  .catch(err => {
    // Log any errors to the console and send a 500 status with error details
    console.error(err);
    res.status(500).json(err);
  })
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
  // Send back a JSON response with status 200 and the data
  .then((tag) => res.status(200).json(tag))
  .catch((err) => {
    // Log any errors to the console and send a 500 status with error details
    console.error(err);
    res.status(500).json(err);
  })
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    }
  })
  .then((tag) => {
    if (!tag[0]) {
      res.status(404).json({ messsge: 'No tag found with this id' });
      return;
    }
    // Send back a JSON response with status 200 and the data
    res.status(200).json({ message: 'Tag updated successfully' });
  })
  .catch((err) => {
    // Log any errors to the console and send a 500 status with error details
    console.error(err);
    res.status(500).json(err);
  })
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: { id: req.params.id },
  })
  .then((tag) => {
    if (!tag) {
      res.status(404).json({ message: 'No tag found with this id' });
      return;
    }
    // Send back a JSON response with status 200 and the data
    res.status(200).json(tag);
  })
  .catch((err) => {
    // Log any errors to the console and send a 500 status with error details
    console.error(err);
    res.status(500).json(err);
  })
});

module.exports = router;
