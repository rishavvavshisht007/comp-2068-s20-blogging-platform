const viewPath = ('blogs');
const Blog = require('../models/blog');

exports.index = (req, res) => {
    res.send("hope all are here and safe");
};

exports.show = (req, res) => {
    res.send("yeah");
};

exports.new = (req,res) => {
    res.render(`${viewPath}/new`, {
        pageTitle: 'New Blog'
    });
};

exports.create = (req, res) => {
    res.send("hlo fam");
};

exports.edit = (req, res) => {
    res.send("Whats up");
};

exports.update = (req, res) => {
    res.send("How's u doing");
};
exports.delete = (req, res) => {
    res.send("Good bye for now");
};