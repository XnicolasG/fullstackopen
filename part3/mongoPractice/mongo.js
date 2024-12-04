require('dotenv').config()
const mongoose = require('mongoose');

const password = process.env.MONGOPASS
const content = process.argv[2]
const important = process.argv[3]
const url = `mongodb+srv://nicolasg:${password}@cluster0.p2qap.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url)

//definir schema
const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean
})

const Note = mongoose.model('Note', noteSchema)

//crear y guardar objetos

if (content && important !== '') {
  
  const note = new Note({
      content,
      important
  })
  note.save().then(result => {
      console.log(`note ${content} saved`);
      mongoose.connection.close()
  })
}else {
  // Note.find({important:true})
  Note.find({}).then(result => {
      result.forEach(note => {
        console.log(note)
      })
      mongoose.connection.close()
    })
}


