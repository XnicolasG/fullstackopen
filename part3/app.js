require('dotenv').config();
const express = require('express');
const app = express();
const notesRouter = require('./controllers/note')
const cors = require('cors');
app.use(express.static('dist'));
app.use(express.json());
const middleware = require('./utils/middleware')
app.use(cors())

app.use(middleware.requestLogger);

app.use('/api/notes', notesRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler);


module.exports = app
