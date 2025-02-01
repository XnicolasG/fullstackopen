const { ReturnDocument } = require('mongodb')
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique: true
    },
    name: String,
    passwordHash: String
})

userSchema.set('toJSON', {
    transform: (document, ReturnDocument) => {
        ReturnDocument.id = ReturnDocument._id.toString()
        delete ReturnDocument._id
        delete ReturnDocument.__v
        delete ReturnDocument.passwordHash
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User