const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TrackSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    duration: String,
    number: Number,
    album: {
        type: Schema.Types.ObjectId,
        ref: 'Album',
        required: true
    },
    published: {
        type: Boolean,
        required: true,
        default: false
    },
    user: {
        type: Schema.ObjectId,
        required: true,
        ref: 'User'
    }
});

const Track = mongoose.model('Track', TrackSchema);

module.exports = Track;