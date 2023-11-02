const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [{ module: Product }],
    });
    res.status(200).json(tagData);
  } catch (error) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ module: Category }, { module: Tag }],
    });

    if (tagData) res.status(200).json(tagData);
    else res.status(404).json({ message: 'No Tag Found with that id!' });
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
  // create a new tag
  try {
    const tagData = await Tag.create({
      tag_name: req.body.name,
    });
    res.status(200).json(tagData);
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
  // update a tag's name by its `id` value
  try {
    const tagData = await Tag.findByPk(req.params.id);

    if (!tagData) res.status(404).json({ message: 'No Tag Found with that id!' });

    const updateTag = await tagData.update({
      tag_name: req.body.name,
    });

    res.status(200).json(updateTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!tagData) {
      res.status(404).json({ message: 'No Tag Found with that id!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
