const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./Models/userModel');
const Event = require('./Models/eventModel');
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/uevents');


app.use(cors());
app.use(express.json());

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ name: username });

    if (user) {
        if (user.password === password) {
            res.status(200).send({ msg: 'user exists and password is correct' });
        } else {
            res.status(401).send({ msg: 'user exists but password is incorrect' });
        }
    } else {
        res.status(404).send({ msg: 'user does not exist' });
    }
});

app.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ name: username });
    if (user) {
        res.status(409).send({ msg: 'user already exists' });
    } else {
        await User.create({
            name: username,
            password: password,
        });
        res.status(201).send({ msg: 'user created' });
    }
});

app.post('/register-event', async (req, res) => {
    const { eventName, name, email, rollNumber, department, year, phoneNumber } = req.body;

    try {
        await Event.create({
            eventName,
            user: {
                name,
                email,
                rollNumber,
                department,
                year,
                phoneNumber
            }
        });

        res.status(201).send({ msg: 'registration successful' });
    } catch (error) {
        res.status(500).send({ msg: 'registration failed', error });
    }
});

app.get('/', (req, res) => {
    res.send('hello');
});

app.listen(4003, () => {
    console.log('server started on port 4003');
});
