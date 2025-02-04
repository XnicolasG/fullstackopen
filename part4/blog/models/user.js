const { ReturnDocument } = require('mongodb')
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique: true,
        minLength: 3
    },
    name: String,
    passwordHash: {
        type: String,
        required : true,
    },
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ]
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