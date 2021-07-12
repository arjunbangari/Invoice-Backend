# Features
- Create a new invoice (includes line items and description)
- Update the status of an invoice (due, paid or late)
- Send the invoice via email ( After creation of an invoice, the email is automatically sent )
- View all invoices
- View late invoices (payment is not done and due date has passed away)
- Added due date to invoices
- Scheduler to alert users via email if payment is late. Scheduler checks on alternate days.
- Scheduler to update the status of invoices as late every day on midnight.

# API Routes

**GET** */api/invoices* : Get all the invoices 

**GET** */api/invoices?status=late* : Get all the late invoices 

**GET** */api/invoices/:id* : Get an invoice by id


\
**POST** */api/invoices* : Create an invoice ( After creation of an invoice a mail is sent to the email of the recipient )

**Note:** Following fields required in body of POST request -

- Name
        
- Email
        
- Subject
        
- Description
        
- Line Items :
        
  - Labor : Rate, Hours
                
  - Items : Array of items with each item having ItemName, Price, Quantity
                

\
**PUT** */api/invoices/:id* : Update the status of an invoice
