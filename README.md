API Routes

GET /api/invoices : Get all the invoices 

GET /api/invoices?status=late : Get all the late invoices 

GET /api/invoices/:id : Get an invoice by id


<br/>
POST /api/invoices : Create an invoice ( After creation of an invoice a mail is sent to the email of the recipient )

Note: Following fields required in body -

        - Name
        
        - Email
        
        - Subject
        
        - Description
        
        - Line Items :
        
                - Labor : Rate, Hours
                
                - Items : Array of items with each item having ItemName, Price, Quantity
                

<br/>
PUT /api/invoices/:id : Update the status of an invoice
