const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const { initialNotes, notesInDb } = require('./test_helper')
const Note = require('../models/note')
// const { MONGOURI } = require('../utils/config')

const api = supertest(app)

beforeEach(async () => {
    await Note.deleteMany({})
    let noteObject = new Note(initialNotes[0])
    await noteObject.save()
    noteObject = new Note(initialNotes[1])
    await noteObject.save()
})

test('notes are returned as json', async () => {
    await api
        .get('/api/notes')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('a valid note can be added', async () => {
    const newNote = {
        content: 'Adding a new note with async/await',
        important: true
    }

    await api
        .post('/api/notes')
        .send(newNote)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const notesAtEnd = await notesInDb()
    assert.strictEqual(notesAtEnd.length, initialNotes.length + 1)

    const contents = notesAtEnd.map(n => n.content)
    assert(contents.includes('Adding a new note with async/await'))
})

test('note without content is not added', async () => {
    const newNote = {
        important: true
    }
    await api
        .post('/api/notes')
        .send(newNote)
        .expect(400)

    const notesAtEnd = await notesInDb()
    assert.strictEqual(notesAtEnd.length, initialNotes.length)
})

test('there are two notes', async () => {
    const response = await api.get('/api/notes')

    assert.strictEqual(response.body.length, 2)
})

test('the first note is about HTML', async () => {
    const response = await api.get('/api/notes')

    const contents = response.body.map(e => e.content)
    assert(contents.includes('HTML is easy'), true)
})

after(async () => {
    await mongoose.connection.close()
})