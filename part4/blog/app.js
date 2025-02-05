const express = require('express')
const app = express()
const blogRoutes = require('./Controller/blog')
const cors = require('cors');
const usersRouter = require('./Controller/user');
const middleware = require('./utils/middleware');
const loginRouter = require('./Controller/login');

app.use(express.json());
app.use(cors())
app.use('/api/blog', blogRoutes)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app