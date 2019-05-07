const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: String,
    bio: String,
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

const Artist = mongoose.model('Artist', ArtistSchema);

module.exports = Artist;