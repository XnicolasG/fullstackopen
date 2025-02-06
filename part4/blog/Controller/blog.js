require('dotenv').config()
const blogRoutes = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken')

// const getTokenFrom = request => {
//     const authorization = request.get('authorization')
//     if (authorization && authorization.startsWith('Bearer ')) {
//         return authorization.replace('Bearer ', '')
//     }
//     return null
// }

blogRoutes.get('/', async (request, response) => {
    const blogs = await Blog
        .find({}).populate('user', {username:1,name:1})
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
    const body = request.body
    !body.title || !body.url && response.status(400).json({ error: 'title o url missing ' })
    // const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ Error: 'Token invalid'})
    }

    const user = await User.findById(decodedToken.id)
    const blog = new Blog({
        title: body.title,
        author: body.author || 'Anonymous',
        url: body.url,
        likes: body.likes || 0,
        user: user.id
    });
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog);
});

blogRoutes.delete('/:id', async (request, response) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ Error: 'Token invalid'})
    }
    const blog = await Blog.findById(request.params.id)
    if (!blog){
        return response.status(404).json({ Error: 'Blog not found'})
    }
    if (blog.user.toString() !== decodedToken.id.toString()){
        return response.status(401).json({ Error: 'You cannot delete this blog'})
    }
    
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
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true, runValidators: true, context: 'query' })
    response.json(updatedBlog)
})

module.exports = blogRoutes

/*
{
    "title": "Exploring SQL queries",
    "author": "Anonymous",
    "url": "https://example.com/SQL",
    "likes": 23,
}
*/