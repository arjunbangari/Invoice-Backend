/* eslint-disable no-undef */
const invoicesRouter = require('express').Router()
const Invoice = require('../models/invoice')
const dateUtil = require('./../utils/date')
const emailUtil = require('../utils/email')

// get all invoices
invoicesRouter.get('/', async (request, response) => {
    try{
        // if query.status==late then update the status of invoices
        if(request.query.status==='late'){
            const invoices = await Invoice.find({})

            // check for all invoices if the due date has passed away and update their status to late
            for await (let invoice of invoices) {
                if(invoice.status==='due' && dateUtil.isLate(invoice.dueDate)){
                    invoice.status = 'late'
                    await invoice.save()
                }
            }
        } 

        const requiredInvoices = await Invoice.find(request.query)
        return response.json(requiredInvoices)

    } catch(err) {
        console.log(err)
        response.status(400).json({ error: error.message })
    } 
})

// create an invoice and send email
invoicesRouter.post('/', async (request, response) => {
    try {
        const body = request.body

        // total amount
        let total = 0

        // calculate invoice date and due date
        let currentDate = dateUtil.currentDate()
        let dueDate = dateUtil.dueDate()

        // for all line items calculate total value
        body.lineItems.labor.total = body.lineItems.labor.rate * body.lineItems.labor.hours
        total += body.lineItems.labor.total

        body.lineItems.items.forEach( (item) => {
            item.total = item.price * item.quantity
            total += item.total
        })

        // save the invoice object
        const invoice = new Invoice({
            ...body,
            invoiceDate: currentDate,
            dueDate,
            total
        })

        const savedInvoice = await invoice.save()
        await emailUtil.sendEmail(savedInvoice)    // send Email to the reciepent
        return response.status(201).json(savedInvoice)

    } catch(err) {
        console.log(err)
        response.status(400).json({ error: error.message })
    }
})

// get an invoice by id
invoicesRouter.get('/:id', async (request, response) => {
    try {
        const id = request.params.id
        const invoice = await Invoice.findById(id)
        return response.json(invoice)
    } catch(err) {
        console.log(err)
        response.status(400).json({ error: error.message })
    }
})


// update an invoices' status
invoicesRouter.put('/:id', async (request, response) => {
    try{
        const body = request.body
        const id = request.params.id

        const invoice = {
            status: body.status
        }

        const updatedInvoice = await Invoice.findByIdAndUpdate(id, invoice, {new: true})
        return response.status(200).json(updatedInvoice)

    } catch(err) {
        console.log(err)
        response.status(400).json({ error: error.message })
    }
})

module.exports = invoicesRouter