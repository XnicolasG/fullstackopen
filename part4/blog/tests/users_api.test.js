const { test, describe, beforeEach, after } = require('node:test')
const mongoose = require('mongoose')
const assert = require('node:assert')
const app = require('../app')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const User = require('../models/user')
const { usersInDb } = require('../utils/list_helpers')

const api = supertest(app)

describe('Tests for User model', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        const passwordHash = await bcrypt.hash('password', 10)
        const user = new User({ username: 'testuser', passwordHash })

        await user.save()
    })
    test('Validate if a user is valid', async () => {
        const usersAtStart = await usersInDb()

        const newUser1 = {
            username: 'Don_Yuyo',
            name: 'Hiuyin',
            password: 'yu'
        }
        const newUser2 = {
            username: 'Do',
            name: 'Hiuyin',
            password: 'yu1'
        }
        await api
            .post('/api/users')
            .send(newUser1)
            .expect(400)
        await api
            .post('/api/users')
            .send(newUser2)
            .expect(400)
        
        const usersAtEnd = await usersInDb()
        assert.strictEqual(usersAtEnd.length, usersAtStart.length) 

    })

    after(async () => {
        await mongoose.connection.close()
    })
})
