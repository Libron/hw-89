const mongoose = require('mongoose');
const config = require('./config');
const loremIpsum = require("lorem-ipsum").loremIpsum;
const nanoid = require('nanoid');

const Artist = require('./models/Artist');
const Album = require('./models/Album');
const Track = require('./models/Track');
const User = require('./models/User');

const getRndInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
};

const generateRandomTracks = (albums, userId) => {
    const tracks = [];
    albums.map((album) => {
        let trackNumber = 1;
        const numberOfTracks = getRndInteger(2, 4);
        for (let i = 0; i < numberOfTracks; i++) {
            tracks.push({
                title: loremIpsum(),
                duration: `0${getRndInteger(0, 5)}:${getRndInteger(0,60)}:${getRndInteger(0, 60)}`,
                album: album._id,
                user: userId,
                number: trackNumber++
            });
        }
    });
    return tracks;
};

const run = async () => {
    await mongoose.connect(config.dbUrl, config.mongoOptions);

    const connection = mongoose.connection;

    const collections = await connection.db.collections();

    for (let collection of collections) {
        await collection.drop();
    }

    const [user, admin] = await User.create(
        {
            username: 'user',
            password: '123',
            role: 'user',
            token: nanoid()
        },
        {
            username: 'admin',
            password: '123',
            role: 'admin',
            token: nanoid()
        }
    );

    const artists = await Artist.create(
        {
            name: 'Jennifer Lopez',
            image: 'artist1.jpg',
            user: user._id,
            published: true,
            bio: 'Jennifer Lynn Lopez is an American singer, actress, dancer and producer. In 1991, Lopez began appearing as a Fly Girl dancer on In Living Color, where she remained a regular until she decided to pursue an acting career in 1993.'
        },
        {
            name: 'Avril Lavigne',
            image: 'artist3.jpg',
            user: user._id,
            bio: 'Avril Ramona Lavigne is a Canadian singer, songwriter, and actress. By the age of 15, she had appeared on stage with Shania Twain and by 16, she had signed a two-album recording contract with Arista Records worth more than $2 million.'
        },
        {
            name: 'Nickelback',
            image: 'artist2.jpg',
            user: user._id,
            bio: 'Nickelback is a Canadian rock band formed in 1995 in Hanna, Alberta, Canada. The band is composed of guitarist and lead vocalist Chad Kroeger, guitarist, keyboardist and backing vocalist Ryan Peake, bassist Mike Kroeger, and drummer Daniel Adair.'
        },
        {
            name: 'Whitney Houston',
            image: 'artist4.jpg',
            user: admin._id,
            bio: 'Whitney Elizabeth Houston was an American singer and actress. She was cited as the most awarded female artist of all time by Guinness World Records and remains one of the best-selling music artists of all time with 200 million records sold worldwide.'
        }
    );

    const albums = await Album.create(
        {
            title: 'Ain\'t It Funny',
            year: 2009,
            image: 'alb4.jpeg',
            user: user._id,
            artist: artists[0]._id
        },
        {
            title: 'Como Ama una Mujer',
            year: 2007,
            image: 'alb5.png',
            user: user._id,
            artist: artists[0]._id
        },
        {
            title: 'A.K.A',
            year: 2014,
            image: 'alb6.png',
            user: user._id,
            published: true,
            artist: artists[0]._id
        },
        {
            title: 'Love?',
            year: 2011,
            image: 'alb7.png',
            user: user._id,
            artist: artists[0]._id
        },
        {
            title: 'Never Again',
            year: 2011,
            image: 'alb2.jpeg',
            user: user._id,
            artist: artists[1]._id
        },
        {
            title: 'Curb',
            year: 1996,
            image: 'alb8.jpg',
            user: user._id,
            artist: artists[2]._id
        },
        {
            title: 'The Long Road',
            year: 2003,
            image: 'alb9.jpg',
            user: user._id,
            artist: artists[2]._id
        },
        {
            title: 'The Best Damn Thing',
            year: 2007,
            image: 'alb3.jpeg',
            user: user._id,
            artist: artists[2]._id
        },
        {
            title: 'Goodbye Lullaby',
            year: 2011,
            image: 'alb10.png',
            user: user._id,
            artist: artists[1]._id
        },
        {
            title: 'Head Above Water',
            year: 2019,
            image: 'alb11.png',
            user: user._id,
            artist: artists[1]._id
        },
        {
            title: 'Under My Skin',
            year: 2002,
            image: 'alb12.png',
            user: user._id,
            artist: artists[1]._id
        },
        {
            title: 'Avril Lavigne',
            year: 2013,
            image: 'alb13.png',
            user: user._id,
            artist: artists[1]._id
        },
        {
            title: 'One Wish: The Holiday Album',
            year: 2003,
            image: 'alb14.jpg',
            user: user._id,
            artist: artists[3]._id
        },
        {
            title: 'Whitney',
            year: 1986,
            image: 'alb1.jpeg',
            user: user._id,
            artist: artists[3]._id
        },
        {
            title: 'My Love Is Your Love',
            year: 1998,
            image: 'alb15.jpg',
            user: user._id,
            artist: artists[3]._id
        }
    );

    const tracks = generateRandomTracks(albums, user._id);

    await Track.create(
        ...tracks
    );
    return connection.close();
};

run().catch(error => {
    console.error('Something went wrong!', error);
});