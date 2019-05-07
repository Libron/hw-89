const express = require('express');
const config = require('./config');
const cors = require('cors');
const mongoose = require('mongoose');

const artists = require('./app/artists');
const albums = require('./app/albums');
const tracks = require('./app/tracks');
const users = require('./app/users');
const track_history = require('./app/track_history');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const port = 8000;

mongoose.connect(config.dbUrl, config.mongoOptions).then(() => {
    app.use('/artists', artists);
    app.use('/albums', albums);
    app.use('/tracks', tracks);
    app.use('/users', users);
    app.use('/track_history', track_history);

    app.listen(port, () => {
        console.log(`Server started on ${port} port`);
    });
});