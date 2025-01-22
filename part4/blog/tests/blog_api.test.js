const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const { initialBlogs, blogsInDb } = require('../utils/list_helpers')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    for (let blog of initialBlogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
    }
})

test('Blogs are returned as json', async () => {
    const response = await api
        .get('/api/blog')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.length, 5)
})

test('Blogs were recived the property id instead of _id', async () => {
    const response = await api
        .get('/api/blog')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    const blogs = response.body
    blogs.forEach(blog => {
        assert('id' in blog)
        assert(!('_id' in blog))
    })
})

test('Post a valid blog post', async () => {
    const newBlog = {
        title: "New Blog Post",
        author: "David Johnson",
        url: "https://example.com/new-blog-post",
        likes: 12
    }

    await api
        .post('/api/blog')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await blogsInDb()
    assert.strictEqual(blogsAtEnd.length, initialBlogs.length + 1)
})

after(async () => {
    await mongoose.connection.close()
})
