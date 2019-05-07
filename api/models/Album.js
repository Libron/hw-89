const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    year: Number,
    image: String,
    artist: {
        type: Schema.Types.ObjectId,
        ref: 'Artist',
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

const Album = mongoose.model('Album', AlbumSchema);

module.exports = Album;