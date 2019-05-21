const express = require('express');
const multer = require('multer');
const path = require('path');
const nanoid = require('nanoid');
const config = require('../config');

const tryAuth = require('../middleware/tryAuth');
const auth = require('../middleware/auth');
const permit = require('../middleware/permit');
const Album = require('../models/Album');

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
            $or: [{user: req.user._id},{published: true}]
        };
    }

    if (req.query.artist_id) {
        if (req.user) {
            criteria = {
                $and: [
                    {$or: [{user: req.user._id}, {published: true}]},
                    {artist: req.query.artist_id}
                ]
            };

            if (req.user.role === 'admin') {
                criteria = {artist: req.query.artist_id}
            }
        } else {
            criteria = {
                $and: [{published: true}, {artist: req.query.artist_id}]
            }
        }
    }

    Album.find(criteria).populate('artist user').sort({year: 'asc'})
        .then(albums => res.send(albums))
        .catch(() => res.sendStatus(500));
});

router.get('/:id', (req, res) => {
    Album.findById(req.params.id).populate('artist')
        .then(album => {
            if (album) res.send(album);
            else res.sendStatus(404);
        })
        .catch(() => res.sendStatus(500));
});

router.post('/', auth, upload.single('image'), (req, res) => {
    const albumData = req.body;

    if (req.file) {
        albumData.image = req.file.filename;
    }

    albumData.user = req.user._id;

    const album = new Album(albumData);
    try {
        album.save()
            .then(result => res.send(result))
            .catch(error => res.status(400).send(error));
    } catch (e) {
        res.sendStatus(500);
    }
});

router.post('/:id/toggle_publish', [auth, permit('admin')], async (req, res) => {
    const album = await Album.findById(req.params.id);

    if (!album) {
        return res.sendStatus(404);
    }

    album.published = !album.published;
    await album.save();

    return res.send(album);
});

router.delete('/:id', auth, async (req, res) => {
    const album = await Album.findById(req.params.id).populate('user');
    if (!album) {
        res.sendStatus(404);
    }

    if (!req.user._id.equals(album.user._id)) {
        if (req.user.role !== 'admin') {
            return res.sendStatus(403);
        }
    }
    try {
        await album.remove();
        res.send(album);
    } catch (e) {
        res.status(500).send(e)
    }
});

module.exports = router;