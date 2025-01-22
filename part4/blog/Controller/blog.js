const blogRoutes = require('express').Router();
const Blog = require('../models/blog')

blogRoutes.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    if (blogs.length === 0) {
        response.status(200).json({ message: 'No blogs found' });
    } else {
        response.status(200).json(blogs);
    }
});

blogRoutes.post('/', async (request, response) => {
    try {
        const blog = new Blog(request.body);
        const savedBlog = await blog.save();
        response.status(201).json(savedBlog);
    } catch (error) {
        response.status(500).json({ error: 'Failed to save the blog' });
    }
});

module.exports = blogRoutes