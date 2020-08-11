const express = require('express');
const app = express();
require('dotenv').config();
const path = require('path');

// Mongo access URL
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URI, {
    auth: {
        user: process.env.DB_USER,
        password: process.env.DB_PASS
    },
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).catch(err => console.error(`Error: ${err}`));

// Implement Body Parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//setup our session
const passport = require('passport');
const session = require('express-session');
app.use(session({
    secret:'any crispy secret here',
    resave:true,
    saveUninitialized:false
}));

//setting up passport
app.use(passport.initialize());
app.use(passport.session());
const User = require('./models/user');
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//set our views directory
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/images', express.static('assets/images'));
app.use('/css', express.static('assets/css'));
app.use('/javascript', express.static('assets/javascript'));

//setup flash notifications and defaults
const flash = require('connect-flash');
app.use(flash());
app.use('/', (req, res, next) => {

//setting default locals
res.locals.pageTitle = "untitled";

//passing along flash message
res.locals.flash = req.flash();
res.locals.formData = req.session.formData || {};
req.session.formData = {};

//Authentication helper
res.locals.authorized = req.isAuthenticated();
if (res.locals.authorized) res.locals.email = req.session.passport.user;
next();
});

//our routes
const routes = require('./routes.js'); 
app.use('/api', routes);

app.get('/test', (req, res) => {
    res.status(200).json({message: 'Hello World'});
  });

const clientRoot = path.join(__dirname, '/client/build');
app.use((req, res, next) => {
    if (req.method === 'GET' && req.accepts('html') && !req.is('json')
    && !req.path.includes('.')){
        res.sendFile('index.html', { clientRoot });
    } else next();
});

//start our server
const port = process.env.PORT || 4000; 
app.listen(port, () => console.log(`Listening on port ${port}`));