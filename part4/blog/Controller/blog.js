const blogRoutes = require('express').Router();
const Blog = require('../models/blog')

blogRoutes.get('/', (request, response) => {
    Blog.find({}).then(blogs => {
        if (blogs.length === 0) {
            response.status(200).json({ message: 'No blogs found' });
        } else {
            response.status(200).json(blogs);
        }
    })
});

blogRoutes.post('/', (request, response) => {
    const blog = new Blog(request.body)

    blog.save()
        .then(result => {
            response.json(result)
        })
})

module.exports = blogRoutes