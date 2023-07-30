const ImageKit = require("imagekit");
const router = require('express').Router();
const { handyman, User, File } = require('../models');
const withAuth = require('../utils/auth');
require('dotenv').config();


router.get('/', withAuth, async (req, res) => {
    try {
        const handymanData = await handyman.findAll({
            include: [
                {
                    model: User,
                    attributes: [
                        'first_name',
                        'last_name'
                    ]
                },
            ],
        });

        const handyman = handymanData.map((handyman) => handyman.get({ plain: true }));

        res.render('landing', {
            handyman,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/handyman/:id', withAuth, async (req, res) => {
    try {
        const handymanData = await Pet.findByPk(req.params.id, {
            include: [
                {
                    model: File
                },
            ],
        });

        const handyman = handymanData.get({ plain: true });

        let img_path = '';
        if (handyman.files.length > 1) {
            img_path = handyman.files[0].path;
        }

        res.render('handyman', {
            ...handyman,
            img_path: img_path,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// locked with auth to prevent viewing a users profile without being logged in
router.get('/handyman', withAuth, async (req, res) => {
    try {
        // Find the logged in user based on the session ID
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: handyman }],
        });

        const user = userData.get({ plain: true });

        res.render('handyman', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    // if the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

// Used to authenticate login for image upload
router.get('/signature', (req, res) => {
    const imagekit = new ImageKit({
        publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
        privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
        urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
    });
    var authentcationParameters = imagekit.getAuthenticationParameters();
    res.send(authentcationParameters);
});

router.get('/documents', withAuth, (req,res) => {
    res.render('documents')
});

//test
router.get('/signup', (req,res) => {
    res.render('signup')
});

module.exports = router;