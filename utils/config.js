require('dotenv').config()

const PORT = process.env.PORT
let MONGODB_URI = process.env.MONGODB_URI
const MAILTRAP_USER = process.env.MAILTRAP_USER
const MAILTRAP_PASSWORD = process.env.MAILTRAP_PASSWORD

module.exports = {
    PORT,
    MONGODB_URI,
    MAILTRAP_USER,
    MAILTRAP_PASSWORD
}