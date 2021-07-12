const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const http = require('http')
const invoicesRouter = require('./controllers/invoices')
const mongoose = require('mongoose')
const scheduler = require('./utils/scheduler')


mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })


app.use(cors())
app.use(express.json())

// router 
app.use('/api/invoices', invoicesRouter)


// Schedulers
scheduler.updateLateInvoices
scheduler.lateInvoicesEmailAlert


const server = http.createServer(app)

const PORT = config.PORT
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})