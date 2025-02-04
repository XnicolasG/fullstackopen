const logger = require('./logger')

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).send({ error: error.message })
    } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
        return response.status(400).json({ error: 'Expected `userame` to be unique' })
    } else if (error.name === 'JsonWebTokenError'){
        return response.status(401).json({ error: 'invalid token' })
    } else if (error.name === 'TokenExpiredError') {
        return response.status(401).json({
            error: 'Token expired'
        })

    }

    next(error)
}

module.exports = {
    unknownEndpoint,
    errorHandler
}