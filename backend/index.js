const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const axios = require('axios'); // Import axios for captcha verification
const User = require('./Models/userModel');
const Event = require('./Models/eventModel');
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/uevents');

app.use(cors());
app.use(express.json());

const TURNSTILE_SECRET_KEY = '0x4AAAAAAAjqz9FYZYQjzI7o2lALBRu5pe4'; // Replace with your secret key

// Function to verify Turnstile CAPTCHA token
const verifyTurnstile = async (token) => {
  try {
    const response = await axios.post(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      `secret=${TURNSTILE_SECRET_KEY}&response=${token}`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    return response.data.success; // Return true if verification is successful
  } catch (error) {
    console.error('Error verifying Turnstile CAPTCHA:', error);
    return false; // Return false if verification fails
  }
};

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ name: username });

  if (user) {
    if (user.password === password) {
      res.status(200).send({ msg: 'User exists and password is correct' });
    } else {
      res.status(401).send({ msg: 'User exists but password is incorrect' });
    }
  } else {
    res.status(404).send({ msg: 'User does not exist' });
  }
});

app.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ name: username });
  if (user) {
    res.status(409).send({ msg: 'User already exists' });
  } else {
    await User.create({
      name: username,
      password: password,
    });
    res.status(201).send({ msg: 'User created' });
  }
});

app.post('/register-event', async (req, res) => {
  const {
    eventName,
    name,
    email,
    rollNumber,
    department,
    year,
    phoneNumber,
    captchaToken, // The token sent from the frontend
  } = req.body;

  // Verify Turnstile CAPTCHA
  const isCaptchaValid = await verifyTurnstile(captchaToken);

  if (!isCaptchaValid) {
    return res.status(400).send({ msg: 'CAPTCHA verification failed' });
  }

  try {
    // If CAPTCHA is valid, create event registration
    await Event.create({
      eventName,
      user: {
        name,
        email,
        rollNumber,
        department,
        year,
        phoneNumber,
      },
    });

    res.status(201).send({ msg: 'Registration successful' });
  } catch (error) {
    res.status(500).send({ msg: 'Registration failed', error });
  }
});

app.get('/', (req, res) => {
  res.send('hello');
});

app.listen(4003, () => {
  console.log('Server started on port 4003');
});
