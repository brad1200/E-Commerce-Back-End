const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
    // find all tags
    // be sure to include its associated Product data
    try {
        const tagData = await Tag.findAll({
            include: [Product],
        });
        res.status(200).json(tagData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    // find a single tag by its `id`
    // be sure to include its associated Product data
    try {
        const tagData = await Tag.findByPk(req.params.id, {
            include: [Product],
        });

        if (!tagData) {
            res.status(404).json({ message: 'No tag found with that ID' });
            return;
        }

        res.status(200).json(tagData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    // create a new tag
    try {
        const newTag = await Tag.create({
            tag_name: req.body.tag_name,
        });
        res.status(200).json(newTag);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put('/:id', async (req, res) => {
    // update a tag's name by its `id` value
    try {
        const userTag = await Tag.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
        if (!userTag[0]) {
            res.status(404).json({ message: 'No tag with this id!' });
            return;
        }
        res.status(200).json(userTag);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    // delete on tag by its `id` value
    try {
        const deleteTag = await Tag.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (!deleteTag) {
            res.status(404).json({ message: 'No tag found with that id!' });
            return;
        }

        res.status(200).json(deleteTag);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
