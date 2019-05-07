const express = require('express');
const auth = require('../middleware/auth');
const permit = require('../middleware/permit');
const Track = require('../models/Track');

const Album = require('../models/Album');

const router = express.Router();

router.get('/', auth, (req, res) => {
    let criteria = {
        $or: [
            {published: true},
            {user: req.user._id}
        ]
    };

    if (req.query.album_id) {
        criteria = {
            $and: [
                {album: req.query.album_id},
                {$or: [
                        {published: true},
                        {user: req.user._id}
                    ]}
            ]
        };

        if (req.user.role === 'admin') {
            criteria = {album: req.query.album_id}
        }
    }

    if (req.query.artist_id) {
        Album.find({artist: req.query.artist_id})
            .then(albums => {
                const trackList = [];
                Promise.all(albums.map(album => {
                    let criteria = {
                        $and: [
                            {album: album._id},
                            {published: true}
                            // $or: [{user: req.user._id}, {published: true}]
                        ]
                    };
                    return Track.find(criteria).populate('album user').sort({number: 'asc'})
                        .then(tracks => trackList.push(...tracks));
                }))
                    .then(() => res.send(trackList))
                    .catch(e => res.status(500).send(e))
            })
            .catch(() => res.sendStatus(500));
    } else {
        Track.find(criteria).populate('album user').sort({number: 'asc'})
            .then(tracks => res.send(tracks))
            .catch(() => res.sendStatus(500));
    }
});

router.post('/', [auth, permit('user', 'admin')], (req, res) => {
    const track = new Track({
        title: req.body.title,
        duration: req.body.duration,
        album: req.body.album,
        number: req.body.number,
        user: req.user.id
    });
    try {
        track.save()
            .then(result => res.send(result))
            .catch(error => res.status(400).send(error));
    } catch (e) {
        res.sendStatus(500);
    }
});

router.post('/:id/toggle_publish', [auth, permit('user', 'admin')], async (req, res) => {
    const track = await Track.findById(req.params.id);

    if (!track) {
        return res.sendStatus(404);
    }

    track.published = !track.published;
    await track.save();

    return res.send(track);
});

router.delete('/:id', auth, async (req, res) => {
    const track = await Track.findById(req.params.id).populate('user');
    if (!track) {
        return res.sendStatus(404);
    }

    if (!req.user._id.equals(track.user._id)) {
        if (req.user.role !== 'admin') {
            return res.sendStatus(403);
        }
    }

    try {
        await track.remove();
        res.send(track);
    } catch (e) {
        res.status(500).send(e)
    }
});

module.exports = router;