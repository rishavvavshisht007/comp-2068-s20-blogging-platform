const viewPath = ('blogs');
const Blog = require('../models/blog');

exports.index = (req, res) => {
    res.send("hope all are here and safe");
};

exports.show = async (req, res) => {
const blog = await Blog.findById(req.params.id);
res.render(`${viewPath}/show`,{
pageTitle: blog.title,
blog:blog
});
};

exports.new = (req,res) => {
    res.render(`${viewPath}/new`, {
        pageTitle: 'New Blog'
    });
};

exports.create = async(req, res) => {
   console.log(`Blog body: ${JSON.stringify(req.body, null, 2)}`);

   try{
       const blog= await Blog.create(req.body);
       res.redirect(`/blogs/${blog.id}`);
   } 
   catch(err){
       res.send(err);
   }

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