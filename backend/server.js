const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

require('dotenv').config();

app.use(bodyParser.json());

const locationRoutes = require('./routes/locationRoutes');
const roadRoutes = require('./routes/roadRoutes');
const trafficUpdateRoutes = require('./routes/trafficUpdateRoutes');
const shortestPathRoutes = require('./routes/shortestPathRoutes'); 

app.use('/', locationRoutes);
app.use('/', roadRoutes);
app.use('/', trafficUpdateRoutes);
app.use('/', shortestPathRoutes); 

mongoose.connect(process.env.mongo_url)
    .then(() => {
        app.listen(4000, () => {
            console.log('Server is running on port 4000');
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
