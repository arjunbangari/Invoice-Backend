const nodemailer = require('nodemailer')
const config = require('./config')

let transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
        user: config.MAILTRAP_USER,
        pass: config.MAILTRAP_PASSWORD
    }
})

const sendEmail = async (invoice) => {
    const message = `
            Name - ${invoice.name} 
            Subject - ${invoice.subject}
            Invoice Date - ${invoice.invoiceDate}
            Due Date - ${invoice.dueDate}
            Total Amount - ${invoice.total}
            Description - ${invoice.description}
            `

    try {
        let info = await transporter.sendMail({
            from: 'abc@xyz.com', 
            to: invoice.email, 
            subject: `Invoice - ${invoice.subject}`,
            text: message
        })

        console.log(info)
    } catch(err) {
        console.error(err)
    }
}

module.exports = {sendEmail}