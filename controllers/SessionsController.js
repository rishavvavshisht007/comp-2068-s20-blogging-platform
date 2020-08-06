const User = require('../models/user');
const passport = require('passport');
const viewPath = 'sessions';

exports.new = (req, res) => {
   res.render(`${viewPath}/new`, {
       pageTitle: 'Login'
   });
};

exports.create = (req, res, next) => {
   passport.authenticate('local', {
     successRedirect: '/blogs',
     successFlash: 'you were succesfully logged in.',
     failureRedirect: '/login',
     failureFlash: 'invalid credentials'
   })(req, res, next);
 };

 exports.delete = (req, res) => {
     req.logout();
     req.flash('success', 'you were logged out succesfully.');
     res.redirect('/'); 
 };