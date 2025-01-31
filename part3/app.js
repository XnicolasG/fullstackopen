require('dotenv').config();
const express = require('express');
const app = express();
require('express-async-errors');
const notesRouter = require('./controllers/note')
const usersRouter = require('./controllers/users')
const cors = require('cors');
app.use(express.static('dist'));
app.use(express.json());
const middleware = require('./utils/middleware');
const loginRouter = require('./controllers/login');
app.use(cors())

app.use(middleware.requestLogger);

app.use('/api/notes', notesRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler);


module.exports = app
