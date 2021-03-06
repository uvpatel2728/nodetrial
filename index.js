
const config = require('config');
const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const users = require('./routes/users');
const genres = require('./routes/genres')
const customers  = require('./routes/customers')
const movies = require('./routes/movies')
const rental = require('./routes/rentals');
const auth = require('./routes/auth');
const express = require('express');
const app = express();

if(!config.get('jwtPrivateKey')){
  console.error('FATAL ERROR: jwtPrivateKey is not defined');
  process.exit(1);
}

  mongoose.connect('mongodb://localhost/vidly')
    .then(() => console.log('Connected to the MongoDB.........'))
    .catch((err) => console.log('Could not connect to mongoDB.....',err));

app.use(express.json());
app.use('/api/users',users);
app.use('/api/genres',genres);
app.use('/api/customers',customers);
app.use('/api/movies',movies);
app.use('/api/rentals',rental);
app.use('/api/auth',auth);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));