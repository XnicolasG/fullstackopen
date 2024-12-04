require('dotenv').config()
const express = require('express');
const morgan = require('morgan')
const cors = require('cors')
const app = express();

const Person = require('./models/Person')
app.use(cors())
app.use(express.json())
app.use(express.static('dist'))
app.use(morgan('tiny'))

morgan.token('body', (req) => {
    return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


const date = new Date()
const day = date.getDate()
const weekday = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date)
const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date)
const year = date.getFullYear()
const hour = date.getHours().toString().padStart(2, '0')
const minutes = date.getMinutes().toString().padStart(2, '0')
const seconds = date.getSeconds().toString().padStart(2, '0')
const time = `${hour}:${minutes}:${seconds}`
const options = { timeZoneName: 'short' };
const formatter = new Intl.DateTimeFormat('en-US', options);
const formattedDate = formatter.formatToParts(date);
const timeZonePart = formattedDate.find(part => part.type === 'timeZoneName');
const timeZone = timeZonePart ? timeZonePart.value : 'Unknown TimeZone'; 0

console.log(timeZonePart);

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})
app.get('/info', (request, response) => {
    response.send(
        `<p>Phonebook has info for ${persons.length} people</p>   
        <p>${weekday} ${month} ${day} ${year} ${time} ${timeZone}</p>`
    )
})
app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        persons.forEach(person => {
            console.log(person.id);
        })

        response.json(persons)
    })
        .catch(error => next(error))
})
app.get('/api/persons/:id', (request, response) => {
    Person.findById((request.params.id))
    .then(person => {
        response.json(person)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response) => {
    Person.findByIdAndDelete(request.params.id).then(result => {
        console.log(result)

        response.status(204).end()
    })
        .catch(error => next(error)
        )
})


app.post('/api/persons', (request, response, next) => {
    const {name, number} = request.body;
   
    const person = new Person({
        name: name,
        number: number,
    });
    person.save().then(personSaved => {
        response.json(personSaved);
    })
    .catch(error => next(error))

});

app.put('/api/persons/:id', (request, response, next) => {
    const {name, number} = request.body;

    const person = {
        name: name,
        number: number,
    }
    Person.find({ name: person.name })
        .then(result => {
            console.log(result)
            
            result.length > 0
                ?
                Person.findByIdAndUpdate(result[0]._id, person, { new: true })
                    .then(updatePerson => {
                        response.json(updatePerson)
                    })
                    .catch(error => next(error))
                :
                response.status(404).json({
                    error: 'Name was not found !'
                })
        })
        .catch(error => next(error))
})

const ErrorHandler = (error, resquest, response, next) => {
    console.log(error.message);
    if (error.name === 'CastError') {
        return respose.status(400).send({ error: 'malformatted id' })
    }else if (error.name === 'ValidationError'){
        return response.status(400).json({ error: 'invalid input' })
    }
    next(error)
}
app.use(ErrorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
})
