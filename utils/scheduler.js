const schedule = require('node-schedule')
const Invoice = require('../models/invoice')
const emailUtil = require('../utils/email')
const dateUtil = require('./../utils/date')


/* checks every minute for all invoices if they are late and updates them
   NOTE:  Ideally it should run everyday at midnight with cron rule - '0 0 * * *'
*/
const updateLateInvoices = schedule.scheduleJob('*/1 * * * *', async () => {
    const invoices = await Invoice.find({})

    // check for all invoices if the due date has passed away and update their status to late
    for await (let invoice of invoices) {
        console.log(invoice.name, invoice.status)
        if(invoice.status==='due' && dateUtil.isLate(invoice.dueDate)){
            invoice.status = 'late'
            await invoice.save()
        }
    }
})

/* Send email alerts to all reciepents whose invoice status is late on alternate days
*/
const lateInvoicesEmailAlert = schedule.scheduleJob('0 0 */2 * *', async () => {
    const invoices = await Invoice.find({status: 'late'})

    for await (let invoice of invoices) {
        await emailUtil.sendEmail(invoice)
    }
})

module.exports = {updateLateInvoices, lateInvoicesEmailAlert}