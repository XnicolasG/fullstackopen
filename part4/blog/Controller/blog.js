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

blogRoutes.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
        response.json(blog)
    } else {
        response.status(404).end()
    }
})

blogRoutes.post('/', async (request, response) => {
    const { title, author, url, likes } = request.body
    !title || !url && response.status(400).json({error: 'title o url missing '})
    try {
        const blog = new Blog({
            title,
            author: author || 'Anonymous',
            url,
            likes: likes || 0
        });
        const savedBlog = await blog.save();
        response.status(201).json(savedBlog);
    } catch (error) {
        response.status(500).json({ error: 'Failed to save the blog' });
    }
});

blogRoutes.delete('/:id', async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

blogRoutes.put('/:id', async (request, response) => {
    const { title, author, url, likes } = request.body
    const blog = {
        title,
        author,
        url,
        likes
        }
        const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true, runValidators: true, context: 'query'})
        response.json(updatedBlog)
})

module.exports = blogRoutes