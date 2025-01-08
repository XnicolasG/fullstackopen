require('dotenv').config()
const PORT = process.env.PORT
const MONGOURI = process.env.NODE_ENV === 'test'
? process.env.TESTMONGOURI
: process.env.MONGOURI

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);

module.exports = {
    PORT, MONGOURI
}