const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config()
const app = express();

app.use(bodyParser.json());


// Routes
const locationRoutes = require('./routes/locationRoutes');
app.use('/', locationRoutes);


mongoose.connect(process.env.mongo_url)
    .then(() => {
        app.listen(4000, () => {
            console.log('Server is running on port 4000');
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });