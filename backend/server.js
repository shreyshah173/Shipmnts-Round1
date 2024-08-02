const express = require('express');
const mongoose = require('mongoose');
const app = express();


require('dotenv').config(); 

mongoose.connect(process.env.mongo_url)
    .then(() => {
        app.listen(4000, () => {
            console.log('Server is running on port 3000');
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

