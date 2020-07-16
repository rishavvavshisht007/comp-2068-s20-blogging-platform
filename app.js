const express = require('express');
const app = express();
require('dotenv').config();

const path = require('path');

//set our views directory
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/images', express.static('assets/images'));
app.use('/css', express.static('assets/css'));
app.use('/java', express.static('assets/java'));

// Mongo access URL
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URI, {
    auth: {
        user: process.env.DB_USER,
        password: process.env.DB_PASS
    },
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch(err => console.error(`Error: ${err}`));

// Implement Body Parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//our routes
const routes = require('./routes.js'); 
app.use('/', routes);

//start our server
const port = process.env.PORT || 3000; 
app.listen(port, () => console.log(`Listening on port ${port}`));