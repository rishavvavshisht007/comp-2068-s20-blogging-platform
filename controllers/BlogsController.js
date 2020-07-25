const viewPath = ('blogs');
const Blog = require('../models/blog');

exports.index = async (req, res) => {
    try{
    const blogs = await Blog.find();
    res.render(`${viewPath}/index`, {
        pageTitle:'Archive',
        blogs: blogs
    });
}   catch(error){
    res.flash('danger', `Stop! There was an error, find it:${error}`);
    res.redirect('/');
}
};

exports.show = async (req, res) => {
    try{
const blog = await Blog.findById(req.params.id);
res.render(`${viewPath}/show`,{
pageTitle: blog.title,
blog:blog
});
    }catch(error){
        res.flash('danger', `Stop! There was an displaying this 
        blog:${error}`);
        res.redirect('/');
    }
    
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
       req.flash('success', 'Blog created succesfully');
       res.redirect(`/blogs/${blog.id}`);
   } 
   catch(error){
       req.flash('danger', `there was an error creating this blog:${error}`);
       req.session.formData = req.body;
       res.redirect('blogs/new');
   }

};

exports.edit = async (req, res) => {
    try{
        const blog = await Blog.findById(req.params.id);
        res.render(`${viewPath}/edit`,{
        pageTitle: blog.title,
        formData: blog
        });
    } catch{
        res.flash('danger', `Stop! There was an accesing this
        blog:${error}`);
        res.redirect('/');
    }
};

exports.update = (req, res) => {
    res.send("How's u doing");
};
exports.delete = (req, res) => {
    res.send("Good bye for now");
};