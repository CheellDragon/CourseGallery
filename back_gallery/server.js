import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import photos from './routes/photos.js';
import users from './routes/users.js';
import config from './config.js';

const app = express();
const PORT = 8000;

app.use(express.static('public'));
app.use(express.json());
app.use(cors());
app.use('/photos', photos);
app.use('/users', users);

const run = async() => {
    mongoose.connect(`${config.db.url}/${config.db.name}`, {useNewUrlParser: true});


    app.listen(PORT, () => {
        console.log(`Server started at http://localhost:${PORT}/`);
    })

    process.on("exit", () => {
        mongoose.disconnect();
    })
}

run().catch(console.error);