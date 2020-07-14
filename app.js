const express = require('express');
const app = express();

const path = require('path');

//set our views directory
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/images', express.static('assets/images'));
app.use('/css', express.static('assets/css'));
app.use('/javascript', express.static('assets/javascript'));




//our routes
const routes = require('./routes.js'); 
app.use('/', routes);

//start our server
const port = process.env.PORT || 3000; 
app.listen(port, () =>
 console.log(`Listening on port ${port}`));