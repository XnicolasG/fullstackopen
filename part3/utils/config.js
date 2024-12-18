require('dotenv').config()
const PORT = process.env.PORT
const MONGOURI = process.env.MONGOURI

module.exports = {
    PORT, MONGOURI
}