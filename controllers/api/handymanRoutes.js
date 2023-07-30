const router = require('express').Router();
const { handyman } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    try {
        const newhandyman = await handyman.create({
            ...req.body,
            handyman_id: req.session.handyman_id,
        });

        res.status(200).json(newhandyman);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put('/:id', withAuth, async (req, res) => {
    // update a tag's name by its `id` value
    try {
        const handymanData = await handyman.update({
            ...req.body,
            where: {
                handyman_id: req.params.handyman_id
            }
        })
            .then(handymanData => {
                if (!handymanData) {
                    res.status(404).json({ message: 'No handyman found with this id!' });
                    return;
                }
                res.status(200).json(handymanData);
            })
    } catch (err) {
        res.status(400).json(err);
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const handymanData = await handyman.destroy({
            where: {
                handyman_id: req.params.handyman_id,
                user_id: req.session.user_id,
            },
        });

        if (!handymanData) {
            res.status(404).json({ message: 'No handyman found with this id!' });
            return;
        }

        res.status(200).json(handymanData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;