import express from "express";
import {nanoid} from "nanoid";
import * as path from 'path';
import multer from 'multer';
import config from "../config.js";
import Photo from "../models/Photo.js";
import User from "../models/User.js";
import mongoose from "mongoose";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
})

const upload = multer({storage})

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const photos = await Photo.find();
        res.send(photos);
    } catch (e) {
        res.sendStatus(500);
    }
});

router.delete('/', async (req, res) => {
    const id = req.body.id
    const token = req.get('Authorization');
    if(!id || !token) return res.sendStatus(400)
    const user = await User.findOne({token});
    if(!user) return res.sendStatus(401);
    try {
        const photo = await Photo.findById(id)
        if(JSON.stringify(photo.user) !== JSON.stringify(user._id)) {
            res.sendStatus(403)
        }
        await Photo.findByIdAndDelete(photo._id)
        res.sendStatus(200);
    } catch (e) {
        res.sendStatus(500);
    }
});

router.get('/profile', async (req, res) => {
    try {
        const token = req.get('Authorization');
        if(!token) return res.sendStatus(400);
        const user = await User.findOne({token});
        if(!user) return res.sendStatus(401);
        const photos = await Photo.find({user: `${user._id}`});
        if(!photos) {return res.sendStatus(404)}
        res.send(photos);
    } catch (e) {
        res.sendStatus(500);
    }
})

router.post('/', upload.single('image'), async (req, res) => {
    const {title} = req.body
    const token = req.get('Authorization');
    if(!title || !token || !req.file) return res.sendStatus(400)
    const user = await User.findOne({token});
    if(!user) return res.sendStatus(401);

    const photo = new Photo({
        username: user.username,
        user: `${user._id}`,
        title: title,
        image: req.file.filename
    });
    try {
        await photo.save();
        res.send(photo);
    } catch(e) {
        res.sendStatus(500);
    }
})



export default router;