const express = require('express');
const TrackHistory = require('../models/TrackHistory');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, (req, res) => {
    TrackHistory.find({user: req.user._id}).populate('track').populate('user')
        .then(history => res.send(history))
        .catch(() => res.sendStatus(500));
});

router.post('/', auth, async (req, res) => {
    const trackData = req.body;
    trackData.datetime = new Date().toLocaleString();
    trackData.user = req.user._id;

    const trackHistory = new TrackHistory(trackData);

    await trackHistory.save();
    res.status(200).send(trackHistory);
});

module.exports = router;