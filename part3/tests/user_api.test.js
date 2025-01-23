const { describe, beforeEach, test, after } = require('node:test')
const assert = require('node:assert')
const app = require('../app')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const { usersInDb } = require('./test_helper')
const { default: mongoose } = require('mongoose')

const api = supertest(app)

describe('When there is initally one user in DB', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('password', 10)
        const user = new User({ username: 'root', passwordHash })

        await user.save()
    })

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await usersInDb()

        const newUser = {
            username: 'Don_Yuyo',
            name: 'Hiuyin',
            password: 'yuyito1'
        }
        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await usersInDb()
        assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

        const userNames = usersAtEnd.map(u => u.username)
        assert(userNames.includes(newUser.username))

    })

    test('creation fails when username were already taken', async () => {
        async () => {
            const usersAtStart = await usersInDb()

            const newUser = {
                username: 'root',
                name: 'original root',
                password: 'password'
            }

            const result = await api
                .post('/api/users')
                .send(newUser)
                .expect(400)
                .expect('Content-Type', /application\/json/)

            const usersAtEnd = await usersInDb()
            assert(result.body.error.includes('expected `username` to be unique'))
            assert.strictEqual(usersAtEnd.length, usersAtStart.length)
        }
    })

    after(async () => {
        await mongoose.connection.close()
    })
})