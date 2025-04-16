const { test, after,describe, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const { initialBlogs, blogsInDb } = require('../utils/list_helpers')
const app = require('../app')
const Blog = require('../models/blog')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const api = supertest(app)

describe("When there's initially data saved", () => {

    beforeEach(async () => {
        await Blog.deleteMany({})
        for (let blog of initialBlogs) {
            let blogObject = new Blog(blog)
            await blogObject.save()            
        }
    })

    test('Blogs are returned as json', async () => {
         await api
            .get('/api/blog')
            .expect(200)
            .expect('Content-Type', /application\/json/)
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

    test('A missing likes property will have 0 as default value', async () => {
        const user = await User.findOne({username: 'testuser'})
        if (!user) {
            const passwordHash = await bcrypt.hash('password', 10);
            const newUser = new User({ username: 'testuser', passwordHash });
            await newUser.save();
        }
    
        const userForToken = {
            username: user.username,
            id: user._id,
        };
        const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: '1h' });
    
        const newBlog = {
            title: 'Test Blog',
            author: 'Test Author',
            url: 'http://test.com'
        };
    
        const response = await api
            .post('/api/blog')
            .set('Authorization', token)  
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/);
    
        const savedBlog = response.body;        
        assert.strictEqual(savedBlog.likes, 0);
    })

    test('Cannot post a blog with missing properties', async () => {
        const blogWithoutUrl = {
            title: 'Test Blog',
            author: 'Percy',
            Likes: 5
        }
        const blogWithoutTitle = {
            author: 'Percy',
            url: 'http://test.com',
            likes: 5
        }
        await api
            .post('/api/blog')
            .send(blogWithoutUrl)
            .expect(400)

        await api
            .post('/api/blog')
            .send(blogWithoutTitle)
            .expect(400)

        const blogsAtEnd = await blogsInDb()
        assert.strictEqual(blogsAtEnd.length, initialBlogs.length)
    })

    test('Post a valid blog ', async () => {
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
})
