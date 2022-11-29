import mongoose from 'mongoose';
import { nanoid } from 'nanoid';
import config from './config.js';
import User from './models/User.js';
import Photo from './models/Photo.js';

mongoose.connect(`${config.db.url}/${config.db.name}`, {useNewUrlParser: true});

const db = mongoose.connection;

db.once('open', async () => {
    try {
        await db.dropCollection('users');
    } catch (e) {
        console.log('Collections were not present, skipping drop...');
    }
    try {
        await db.dropCollection('photos');
    } catch (e) {
        console.log('Collections were not present, skipping drop...');
    }

    const [user1,user2,user3] = await User.create({
        username: 'd',
        password: '1',
        token: nanoid(),
    }, {
        username: 'x',
        password: '1',
        token: nanoid(),
    }, {
        username: 'e',
        password: '1',
        token: nanoid(),
    }
    )

    await Photo.create({
        title: 'profile1',
        image: 'profile1.png',
        username: user1.username,
        user: user1._id
    }, {
        title: 'profile2',
        image: 'profile2.png',
        username: user2.username,
        user: user2._id
    }, {
        title: 'profile.',
        image: 'RCuneChcApfidKRiNsLmW.png',
        username: user3.username,
        user: user3._id
    })

    await db.close();
})

