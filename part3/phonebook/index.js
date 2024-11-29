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

morgan.token('body', (req)=>{
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
        response.json(persons)
    })
})
app.get('/api/persons/:id', (request, response) => {
    Person.findById((request.params.id)).then(person => {
     response.json(person)
    })
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

// const generateId = (max) => {
//     const maxId = persons.length > 0
//         ? Math.floor(Math.random() * max)
//         : 0
//     return maxId
// }

app.post('/api/persons', (request, response) => {
    const body = request.body;
    if (!body.name || !body.number) {
        return response.status(404).json({
            error: 'Name or number missing'
        });
    }
    // if (persons.some(p => p.name === body.name)) {
    //     return response.status(409).json({
    //         error: 'name must be unique'
    //     })
    // } 
    const person = new Person( {
        name: body.name,
        number: body.number,
    });
    person.save().then(personSaved => {
        response.json(personSaved);
    })
    // persons = persons.concat(person);
});

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
})
