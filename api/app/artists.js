const express = require('express');
const multer = require('multer');
const path = require('path');
const nanoid = require('nanoid');
const config = require('../config');

const auth = require('../middleware/auth');
const tryAuth = require('../middleware/tryAuth');
const permit = require('../middleware/permit');


const Artist = require('../models/Artist');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({storage});

const router = express.Router();

router.get('/', tryAuth, (req, res) => {
    let criteria = {published: true};

    if (req.user) {
        criteria = {
            $or: [
                {published: true},
                {user: req.user._id}
            ]
        };

        if (req.user.role === 'admin') {
            criteria = null;
        }
    }

    Artist.find(criteria).populate('user')
        .then(artists => res.send(artists))
        .catch(() => res.sendStatus(500));
});

router.post('/', [auth, permit('user', 'admin')], upload.single('image'), (req, res) => {
    const artistData = req.body;
    artistData.user = req.user._id;

    if (req.file) {
        artistData.image = req.file.filename;
    }

    const artist = new Artist(artistData);

    try {
        artist.save()
            .then(result => res.send(result))
            .catch(error => res.status(400).send(error));
    } catch (e) {
        res.sendStatus(500);
    }
});

router.post('/:id/toggle_publish', [auth, permit('user', 'admin')], async (req, res) => {
    const artist = await Artist.findById(req.params.id);

    if (!artist) {
        return res.sendStatus(404);
    }

    artist.published = !artist.published;
    await artist.save();

    return res.send(artist);
});

router.delete('/:id', auth, async (req, res) => {
    const artist = await Artist.findById(req.params.id).populate('user');
    if (!artist) {
        res.sendStatus(404);
    }

    if (!req.user._id.equals(artist.user._id)) {
        if (req.user.role !== 'admin') {
            return res.sendStatus(403);
        }
    }

    try {
        await artist.remove();
        res.send(artist);
    } catch (e) {
        res.status(500).send(e)
    }
});

module.exports = router;