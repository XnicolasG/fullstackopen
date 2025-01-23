const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const { initialNotes, notesInDb, nonExistingId } = require('./test_helper')
const Note = require('../models/note')
// const { MONGOURI } = require('../utils/config')

const api = supertest(app)


describe('when there is initially some notes saved', () => {
    beforeEach(async () => {
        await Note.deleteMany({})
        for (let note of initialNotes) {
            let noteObject = new Note(note)
            await noteObject.save()
        }
    })

    test('notes are returned as json', async () => {
        await api
            .get('/api/notes')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('all notes are returned', async () => {
        const response = await api.get('/api/notes')

        assert.strictEqual(response.body.length, initialNotes.length)
    }
    )

    test('the first note is about HTML', async () => {
        const response = await api.get('/api/notes')

        const contents = response.body.map(e => e.content)
        assert(contents.includes('HTML is easy'), true)
    })

    test('there are two notes', async () => {
        const response = await api.get('/api/notes')

        assert.strictEqual(response.body.length, 2)
    })
    describe('viewing a specific note', () => {

        test('a Specif note can be viewed', async () => {
            const notesAtStart = await notesInDb()

            const noteToView = notesAtStart[0]

            const resultNote = await api
                .get(`/api/notes/${noteToView.id}`)
                .expect(200)
                .expect('Content-Type', /application\/json/)

            assert.deepStrictEqual(resultNote.body, noteToView)
        })

        test('Fails with 404 if note does not exist', async () => {
            const validNoneExistingId = await nonExistingId()

            await api
                .get(`/api/notes/${validNoneExistingId}`)
                .expect(404)
        })

        test('fails with 400 if id is not valid', async () => {
            const invalidId = '454d843a84354d3513351'

            await api
                .get(`/api/notes/${invalidId}`)
                .expect(400)
        })
    })

    describe('Addition of a new Note', () => {

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
    })

    describe('deletion of a Note', () => {

        test('a note can be deleted', async () => {
            const notesAtStart = await notesInDb()
            const noteToDelete = notesAtStart[0]

            await api
                .delete(`/api/notes/${noteToDelete.id}`)
                .expect(204)

            const notesAtEnd = await notesInDb()
            const content = notesAtEnd.map(r => r.content)
            assert(!content.includes(noteToDelete.content))
        })
    })


    after(async () => {
        await mongoose.connection.close()
    })
})