const mongoose = require('mongoose')

const invoiceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    subject: String,
    invoiceDate: {
        type: String,
        default: Date.now
    },
    dueDate: {
        type: String,
        required: true
    },
    lineItems: {
        labor: {
            rate: Number,
            hours: Number,
            total: Number
        },
        items: [
            {
                itemName: String,
                price: Number,
                quantity: Number,
                total: Number,
                _id: false
            }
        ]
    },
    total: {
        type: Number,
        required: true
    },
    description: String,
    status: {
        type: String,
        default: 'due'
    }

})

invoiceSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Invoice = mongoose.model('Invoice', invoiceSchema)

module.exports = Invoice