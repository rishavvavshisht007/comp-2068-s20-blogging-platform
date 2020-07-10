const express = require('express');
const app = express();

const path = require('path');

//set our views directory
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/images', express.static('assets/images'));
app.use('/css', express.static('assets/css'));



//our routes
const routes = require('./routes.js');
app.use('/', routes);

//start our server
app.listen(process.env.port || 3000, port => console.log
(`listening on port ${port}`));