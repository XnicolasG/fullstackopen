const notesRouter = require('express').Router();
const Note = require('../models/note');

notesRouter.get('/', async (request, response) => {
    const notes = await Note.find({})
    response.json(notes);
})

notesRouter.get('/:id', async (request, response) => {

    const note = await Note.findById(request.params.id)
    if (note) {
        response.json(note);
    } else {
        response.status(404).end()
    }
})

notesRouter.post('/', async (request, response) => {
    const body = request.body
    const note = new Note({
        content: body.content,
        important: body.important || false
    })

    const savedNote = await note.save()
    response.status(201).json(savedNote)
    // .catch(error => next(error))
})

notesRouter.delete('/:id', async (request, response) => {
    await Note.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

notesRouter.put('/:id', (request, response, next) => {
    const { content, important } = request.body

    const note = {
        content,
        important
    }
    Note.findByIdAndUpdate(request.params.id, note, { new: true, runValidators: true, context: 'query' })
        .then(updatedNote => {
            response.json(updatedNote)
        })
        .catch(error => next(error))
})

module.exports = notesRouter