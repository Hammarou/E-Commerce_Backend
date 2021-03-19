const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', (req, res) => {
  // find all products
  // be sure to include its associated Category and Tag data
  Product.findAll({
    include: [
      Category, // 1-many relationship
      // many-many relationship between Product and Tag through join-table ProductTag
      { model: Tag, through: ProductTag }],
  })
    // Send back a JSON response with status 200 and the data
    .then((products) => res.status(200).json(products))
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});

// get one product
router.get('/:id', (req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
  Product.findOne({
    where: { id: req.params.id },
    include: [Category, { model: Tag, through: ProductTag }],
  })
    .then((product) => {
      if (!product) {
        res.status(404).json({ message: 'No product found with this id' });
        return;
      }
      // Send back a JSON response with status 200 and the data
      res.status(200).json(product);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});

// create new product
router.post('/', (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
  Product.create(req.body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        // Make into relationship between product and tag
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // Send back a JSON response with status 200 and the data
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      // Log any errors to the console and send a 400 status with error details
      console.log(err);
      res.status(400).json(err);
    });
});

// update product
router.put('/:id', (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      if (req.body.tagIds && req.body.tagIds.length) {
        
        ProductTag.findAll({
          where: { product_id: req.params.id }
        }).then((productTags) => {
          // create filtered list of new tag_ids
          const productTagIds = productTags.map(({ tag_id }) => tag_id);
          const newProductTags = req.body.tagIds
          .filter((tag_id) => !productTagIds.includes(tag_id))
          .map((tag_id) => {
            return {
              product_id: req.params.id,
              tag_id,
            };
          });

            // figure out which ones to remove
          const productTagsToRemove = productTags
          .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
          .map(({ id }) => id);
          // update tags by destorying previous and adding new updated
          return Promise.all([
            // destory the product tags
            ProductTag.destroy({ where: { id: productTagsToRemove } }),
            // create the new product tags
            ProductTag.bulkCreate(newProductTags),
          ]);
        });
      }

      return res.status(200).json(product);
    })
    .catch((err) => {
      // Log any errors to the console and send a 400 status with error details
      console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete one product by its `id` value
  Product.destroy({
    where: { id: req.params.id },
  })
    .then((deletedProduct) => {
      if (!deletedProduct) {
        res.status(404).json({ message: 'No product found with this id' });
        return;
      }
      // Send back a JSON response with status 200 and the data
      res.status(200).json(deletedProduct);
    })
    .catch((err) => {
      // Log any errors to the console and send a 500 status with error details
      console.error(err);
      res.status(500).json(err);
    });
});

module.exports = router;
