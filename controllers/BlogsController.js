const viewPath = 'blogs';
const Blog = require('../models/blog');
const User = require('../models/user');

exports.index = async (req, res) => {
    try{
    const blogs = await Blog
    .find()
    .populate('user')
    .sort({updatedAt: 'desc'});

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
const blog = await Blog.findById(req.params.id).populate('user');
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

   try{
       const { user: email } = req.session.passport;
       const user = await User.findOne({email: email});
       const blog= await Blog.create({user: user._id , ...req.body});
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
    } catch (error) {
        req.flash('danger', `Stop! There was an error accesing this blog: ${error}`);
        res.redirect('/');
    }
};

exports.update = async (req, res) => {

    try {
    const { user: email } = req.session.passport;
    const user = await User.findOne({email: email});

    console.log(req.body);
    let blog = await Blog.findById(req.body.id);
    if (!blog) throw new Error ('Blog could  not be found');
    
    const attributes = {user: user._id, ...req.body};
    await Blog.validate(attributes);
    await Blog.findByIdAndUpdate(attributes.id, attributes);
    
    req.flash('success', 'The blog was updated succesfully.');
    res.redirect(`/blogs/${req.body.id}`);

    } catch (error) {
        req.flash('danger', `Stop! There was an error updating this blog: ${error}`);
        res.redirect(`/blogs/${req.body.id}/edit`);
    } 
};
exports.delete = async (req, res) => {

   try{
    console.log(req.body);
    await Blog.deleteOne({_id: req.body.id});
    req.flash('success', 'The blog was deleted succesfully.');
    res.redirect(`/blogs`);

   } catch{
    req.flash('danger', ` There was an error deleting this blog: ${error}`);
    res.redirect(`/blogs`);
   }
};