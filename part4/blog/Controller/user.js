const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User
    .find({}).populate('blogs', {title:1,url:1,author:1})
    response.json(users)
})

usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body

    if (password.length < 3){
        return response.status(400).json({Error: 'Password length must be at least 3 character long' })
    } else if (username.length < 3 ){
        return response.status(400).json({Error: 'Username length must be at least 3 character long'})
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash
    })
    const savedUser = await user.save()
    response.status(201).json(savedUser)
})

module.exports = usersRouter

/*
{
    "username": "SrPizza",
    "name": "Nicolás",
    "password": "123456"
    eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNyUGl6emEiLCJpZCI6IjY3OWQ4YjQwM2Q1NGI1YjA3NGM5Zjg3OSIsImlhdCI6MTczODg2MjEwMH0.Jk6LC2G-CZVrEoo_GuMaMGVAmpBKi64nSXlg8Mp7dcY
},
{
    "username": "Sof", 
    "name": "Sofía", 
    "password": "as"
    eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNvZiIsImlkIjoiNjdhMTRiODU0NmE0ZWQ0ZGUxNjUwNTBkIiwiaWF0IjoxNzM4ODYxMTUxfQ.TwDBXFI-FopTmfvlTPWi73kXVT8aozT0N7DjJZdnl9M
}
*/