const { Router } = require("express");
const { route } = require("../routes");

const { home, about, contact } = require('../controllers/PagesController')

module.exports = router => {
router.get('/', home);

router.get('/about', about);

router.get('/contact', contact);

// this is without controller callback!
router.get('/features', (req,res) => {
    res.send('Here is your features');
});

};