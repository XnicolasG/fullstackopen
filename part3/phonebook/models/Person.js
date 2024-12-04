require('dotenv').config();
const mongoose = require('mongoose')

const url = process.env.MONGOURI
console.log('uri: ', url);

mongoose.set('strictQuery', false)
mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minLength: 3
    }, 
    number: {
      type: String,
      required: true,
      validate: {
        validator: function(v){
          return /^\d{2,3}-\d{5,}$/.test(v);
        },
        message: props => `${props.value} is not a valid phone number`
      }
    }
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Person = mongoose.model('Person', personSchema)

module.exports = Person