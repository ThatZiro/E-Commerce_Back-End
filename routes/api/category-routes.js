const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Product.findAll({
      include: [{ module: Product }],
    });
    res.status(200).json(categoryData);
  } catch (error) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ module: Product }],
    });

    if (categoryData) res.status(200).json(categoryData);
    else res.status(404).json({ message: 'No Category Found with that id!' });
  } catch (error) {
    res.status(500).json(err);
  }
});

/* req.body should look like this...
    {
      name: "Basketball",
    }
  */
router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create({
      category_name: req.body.name,
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

/* req.body should look like this...
    {
      name: "Basketball",
    }
  */
router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryData = await Category.findByPk(req.params.id);

    if (!categoryData) res.status(404).json({ message: 'No Tag Found with that id!' });

    const updateCategory = await categoryData.update({
      category_name: req.body.name,
    });

    res.status(200).json(updateCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No Category Found with that id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
