# Introduction

- WANDERLUST Web App is a app like AIRBNB web app ( NOT a Airbnb clone ).

- Step 1 to 8 = Basic Listings CRUD Operations with no styles
- Step 9 to 15 = Styling Listings CRUD Pages
- Step 16 to 22 = Client & Server Side - Validations & Error Handling
- Step 23 to 31 = Reviews
- Step 32 = Delete Listing
- Step 33 = Express Router
- Step 34 = Cookies

# Step 0 - Prerequisites

- Software Usage

  - VS Code
  - MongoDB Server
  - Mongo Shell
  - NodeJS

- Node Modules

  - nodemon ( globally one time install, if not already installed )
  - express
  - ejs
  - ejs-mate
  - mongoose
  - method-override
  - joi

- Extra Online packages ( cdn links )

  - CSS styles = Bootstrap
  - icons = FontAwesome
  - fonts = Google Fonts

# Step 1 - Basic Set Up

- Sub-Directories ( our main directory is "01-WANDERLUST" )

  - init = initializing our app ( Files to store sample data in database )
  - public = static files ( css stylesheets )
  - views = ejs web page files
  - models = different model files as per different styles of Schema ( collection )
  - utils = extra .js files ( error class, error catching function )
  - routes = routes for different collections

-- In VS Code Terminal

  - npm init -y
  - npm i express
  - npm i ejs
  - npm i mongoose
  - touch app.js    ( "app.js" is our main file which we will run through "nodemon" )

-- In app.js

  - write some basic code, start server ( app.listen... )
  - write some basic code, connect to MongoDB ( mongoose.connect... )

-- In VS Code Terminal

  - nodemon app.js  ( after some coding in it )

# Step 2 - Making Model

- Home Page of our web app will have all listings of places( Apartment, Villa, Flat, etc ).
- These places will have title, description, image, price, location, country, etc.

- So, we will make "Listing" Model ( Meaning, We will have "listings" named collection In "wanderlust" named database of MongoDB ).

- In this "Listing" model, we have our documents ( data of documents which will come from sample data when we execute Step 3 )

-- In models/listing.js

    - write some code, create Schema, create model, export model

-- In app.js

    - require above "Listing" model

# Step 3 - Initialize Database

- We will store some data( documents ) in "listings" collection.

-- In init/data.js

    - In here, we have sample data( Array of Objects( documents ) ).
    - export that data ( array )

-- In init/index.js

    - require data from data.js
    - require Listing from listing.js
    - create connection to MongoDB
    - add data into MongoDB

-- In VS Code Terminal ( init directory - only one time to add sample data )

    - node index.js

# Step 4 - Index Route

- Home Page
- GET   /listings   - All listings ( index.ejs )

-- In app.js

    - app.get...
    - require path, app.set..., app.set...
    - render listings/index.ejs

-- In views/listings/index.ejs

    - set all listings ( unordered list for now )
    - set anchor tag to show specific listing data when clicked

# Step 5 - Show Route ( READ )

- View specific listing data ( when clicked from views/listings/index.ejs )
- GET   /listings/:id   - Specific listing data ( show.ejs )

-- In app.js

    - app.use... ( to parse url data )
    - app.get...
    - find listing document by id
    - render listings/show.ejs

-- In views/listings/show.ejs

    - set listing data ( unordered list for now )

# Step 6 - New & Create Route ( CREATE )

- Add New listing Page
- GET   /listings/new   - New listing form ( new.ejs )
- POST  /listings/:id   - Add New listing data into Database

-- In listings/index.ejs

    - add "New" form button
    - set action attribute for GET method to "/listings/new"

-- In app.js

    - write this method above step 5 app.get method
    - app.get...
    - render listings/new.ejs

-- In views/listings/new.ejs

    - set up form for new listing details addition
    - set action attribute for POST method to "/listings"

-- In app.js

    - app.post...
    - add data into database
    - redirect to "/listings" page

# Step 7 - Edit & Update Route ( UPDATE )

- Edit listing Page from specific listing detail page ( Step 5 )
- GET   /listings/:id/edit   - edit listing form ( edit.ejs )
- PUT  /listings/:id   - Add updated listing data into Database

-- In listings/show.ejs

    - add "Edit" anchor tag
    - set attribute href to "/listings/:id/edit"

-- In app.js

    - app.get...
    - find listing data by id
    - render listings/edit.ejs

-- In VS Code Terminal

    - npm i method-override

-- In app.js

    - require method-override
    - app.use...

-- In views/listings/edit.ejs

    - set up form for listing details to be updated
    - set action attribute to "/listings/:id?_method=PUT"

-- In app.js

    - app.put...
    - update data by id into database
    - redirect to `/listings/${id}` page

# Step 8 - Delete Route ( DELETE )

- DELETE  /listings/:id   - delete listing

-- In listings/show.ejs

    - add "Delete" button in form
    - set action attribute to "/listings/:id?_method=DELETE"

-- In app.js

    - app.delete...
    - delete by id into database
    - redirect to "/listings" page

# Step 9 - Creating Boilerplate

- We write same code block for many different ejs files 
- but now we write this code block only one time and export it to these different ejs files

-- In VS Code Terminal

    - npm i ejs-mate

-- In app.js

    - require ejs-mate
    - app.engine...

-- In views/layouts/boilerplate.ejs

    - this code block will be in all other ejs files, so we will make it only one time
    - body will be different of all other ejs files so add this code of line in body:
        <div class="container"><%- body %></div>
    
- Now, remove all codes from ejs files except for body and add this code of line:
        <% layout("/layouts/boilerplate") %>


- Make a public directory and css a sub directory

-- In public/css/style.css

    - write simple style to test it out

-- In app.js

    - app.use... for access of public folder

-- In views/layouts/boilerplate.ejs

    - link stylesheet: "/css/style.css"

# Step 10 - Navbar

- We will use pre-built css from Bootstrap

- From Bootstrap website, copy link tag from getting started/inroduction page => 2. code block
and paste in boilerplate

--  In views/layouts/boilerplate.ejs

    - From Bootstrap website, copy link tag from getting started/inroduction page => 2. code block
    - paste it above </head>
    - Also, copy script and paste just above </body>

--  In views/includes/navbar.ejs

    - From components/navbar, copy code block of anchor tag version from simple Nav#  and paste it

--  In views/layouts/boilerplate.ejs

    - write this code block ( here at the top - below <body> ) to include above navbar:
        <%- include("../includes/navbar.ejs") %>

--  In views/includes/navbar.ejs

    - change some name of the classes so it will be according to our own custom style
    - replace "bg-body-tertiary" with "bg-body-light"
    - remove disabled anchor tag
    - according to our pages, change in anchor tags like href, text content, etc.
      - 1 for All Listing
      - 2 for Add New Listing
    - remove class active of anchor tag
    - remove aria-current property of anchor tag

    - navbar from Bootstrap is responsive, we will add some of the classes for more responsiveness
       -  replace "navbar-expand-large" with "navbar-expand-md"

-- In views/listings/index.ejs

    - remove form tag from which we would navigate to adding new listing


- Add New Icons - from fontawesome website

    - search for your icon and copy tag: 
        "<i class="fa-regular fa-compass"></i>"
    
--  In views/includes/navbar.ejs

    - paste it in text content of anchor tag which has class="navbar-brand"
    - in the href="" add link to home page

--  In views/layouts/boilerplate.ejs

    - For this icon to work, we have add cdn link tag which we will copy
    - from cdnjs.com/libraries/font-awesome, paste it above </head>

-- In public/css/style.css

    - we add some custom styles, for this override effect of bootstrap, we have include "!important"
    - add style for .navbar height
    - add color to fa-compass and font-size
    - update color of "nav-link"

--  In views/includes/navbar.ejs

    - add class"border-bottom" in nav tag, which is default class of bootstrap, which will show border
    - for sticky nav, add built in bootstrap class "sticky-top" in nav tag

-- In public/css/style.css

    - give it bg-color "white" in .navbar

# Step 11 - Footer

-   We will make footer, which will be same in all pages, and include this footer into boilerplate

--  In views/includes/footer.ejs

    - write some code
    - add social icons from fontawesome

-- In public/css/style.css

    - add styles for footer   

--  In views/layouts/boilerplate.ejs

    - include above footer in boilerplate, above script tag 
        <%- include("../includes/footer.ejs") %>

# Step 12 - Styling Index ( Home Page )

-   We will make cards, copy from Bootstrap

--  In views/listings/index.ejs

    - paste in here
    - add our details and as per requirement write code
    - for responsiveness, we will wrap whole for loop with div class="row" of Bootstrap
    and as per xs,sm,md,lg,xl add class="row-cols-lg-3 row-cols-md-2 row-cols-sm-1"

-- In public/css/style.css

    - we style index page
    - add google fonts css rules from website and paste it 

-- In views/layouts/boilerplate.ejs

    - add google fonts link from website and paste it above </head>

-- In public/css/style.css

    - add hover effect and click effect of card, we wrap caard with anchor tag    

# Step 13 - Styling New Listing

-   We will take class names and labels from form of Bootstrap, copy them

-- In views/listings/new.ejs

    - paste in here as per requirement

-- In public/css/style.css

    - our footer is not sticking to bottom, give body flex.

# Step 14 - Styling Edit Listing

-   We will take class names and labels from form of Bootstrap, copy them

-- In views/listings/edit.ejs

    - paste in here as per requirement

-- In public/css/style.css

    - edit button style change

# Step 15 - Styling Show Listing

- We will take card code block from Bootstrap, copy it and 

-- In views/listings/edit.ejs

    - paste in here as per requirement

-- In public/css/style.css

    - edit and delete button style change

# Step 16 - Client-Side Form Validation

- When we enter data in the form, the browser and/or the web server will check to that
- the data is in the correct format and within the constraints set by application

-- In views/listings/edit.ejs & /new.ejs

    - add attribute "required" to the fields of our forms ( input, textarea, ... )
    - In above case, as per browser default error message will appear if fields are empty

- In all browsers, we want our own custom styling of error message, for form validation
- So, we will use Bootstrap => Forms => Validation

-- In views/listings/edit.ejs & /new.ejs

    - add "novalidate" attribute in form tag to remove default validation error messages
    - add " class="needs-validation" " of bootstrap
    - add javascript logic of bootstrap for above class "needs-validation"

-- In public/js/validationScript.js

    - add javascript logic from bootstrap for above class "needs-validation"

-- In views/layouts/boilerplate.ejs

    - add script tag    

# Step 17 - Client-Side Form Validation - Success and Failure Text

- We will style validation success or failure message, If data inserted by user is valid or not 

-- In views/listings/edit.ejs & /new.ejs

    - add div inside individual field-div, which has bootstrap class "valid-feedback" & "invalid-feedback"
    - we will add our own messages for valid or invalid content

# Step 18 - Server-Side Errors - wrapAsync function

- Errors will come from MongoDB, when it cannot save data because of defined schema 

-- In utils/wrapAsync.js

    - make "wrapAsync" function to catch errors

-- In app.js

    - require "./utils/wrapAsync.js"
    - pass all async functions to this "wrapAsync" function
    - add our own custom error handling middleware app.use((err, ...)) at last

# Step 19 - Server-Side Errors - ExpressError Class

- We can send our own custom error messages to user

-- In utils/ExpressError.js

    - make "ExpressError" class to define status and message

-- In app.js

    - require ./utils/ExpressError.js"
    - add app.all("*",...), for page which we didn't make ( page not found )
    - send status and message in app.use((err,...))

# Step 20 - Server-Side Errors - Error page

- We will make our own error.ejs which will have error messages

-- In views/error.ejs

    - write code for alert from bootstrap

-- In app.js

    - render "error.ejs" from app.use((err,...)) 

# Step 21 - Server-Side Errors - Schema Validation

- If we add data from hoppscotch, postman, etc; then above form validation won't work
- We have to check individual fields before data is saved in MongoDB
- We will use joi tool in making of schema, which is server-side validation tool

-- In VS Code Terminal

    - npm i joi

-- In schema.js

    - require "joi"
    - make schema validator using "joi"

-- In app.js

    - require "schema.js"
    - add "result = listingSchemaJoiValidator.validate(req.body)" in new & edit route where validator is required
    - throw error if error is there: if(result.error) { throw new ExpresError(...) }

# Step 22 - Server-Side Errors - Schema Validation Middleware

- We can set above schema validation as a middleware

-- In app.js

    - create a only one function "validateSchema" which will validate schema
    - add this function "validateSchema" as middleware in post & put code block

# Step 23 - Creating Review model

- We will create review model, in which we store comment, stars, date-time

-- In models/review.js

    - require mongoose
    - make reviewSchema
    - make model
    - export model

# Step 24 - Attach reviews with listings

- We will add reference (ObjectID) in listingSchema, because it is a "One to Many" database relationship

-- In models/listing.js

    - add "review" key and value as an array of reference of Review model in listingSchema definition

# Step 25 - Create Review form

- We will create review form to get review from user

-- In views/listings/show.ejs

    - create form for review
    
# Step 26 - Store Reviews in Database

- We will create review route to store reviews in the database. As we store reviews for individual listing, we have route as "listing/:id/reviews

-- In app.js

    - require review model
    - write after delete route of listing

# Step 27 - Client side Validations of reviews

- We will validate form data given by user using default & bootstrap classes in form itself.

-- In views/listings/show.ejs

    - textarea = add "required"
    - form = add "novalidate" and add class "needs-validation" of bootstrap
    - add some div for error

# Step 28 - Server side Validations of reviews

- We will validate data given by user as per database types and conditions using JOI.
- Define Joi for reviewSchema, make funtion for validation error, pass this function as middleware.

-- In schema.js

    - write codes for Joi reviewSchema

-- In app.js

    - require reviewSchemaJoiValidator
    - make function "validateReview" below "validateListing"
    - write "validateReview" as middleware to post method of review

# Step 29 - Render Reviews

- show reviews in individual listing page

-- In views/listings/show.ejs

    - add div for showing reviews of this listing

-- In app.js

    - add "populate" method in app.get of listing, So that we can access data of reviews

# Step 30 - Styling Reviews

- style reviews as cards

-- In views/listings/show.ejs

    - add bootstrap card classes

# Step 31 - Deleting Reviews

- add delete button, delete route in app.js (/listings/:id/reviews/:reviewId)
- we have to delete review from review collection as well as listing collection

-- In views/listings/show.ejs

    - add delete button in form

-- In app.js

    - create delete route for review
    - $pull = This operator removes elements from an existing array for all instances of a value or values that match a specified condition. $pull searches as per our condition and pulls that whole referenceID

# Step 32 - Delete Listing

- Delete listing as well as all reference id ( such as reviews ). We will use mongoose middleware for delete

-- In models/listing.js

    - we will create post mongoose middleware here, which will come to effect when we delete any listing

# Step 33 - Express Router

- Express Routers are a way to organize your Express application such that our primary app.js file does not become bloated.

-- In routes/listing.js

    - require express
    - create router object
    - paste listings routes from app.js
    - replace "app" with "router"
    - we will add "/listings" from path in app.js, so remove that from all the paths
    - export "router"
    - cut-paste other required objects, required function which we will use here from app.js ( don't forget to check path when reuire is used )

-- In app.js

    - require router from routes folder give it name as per file name.
    - e.g. const listings = require("./routes/listing.js");
    - connect app.js and routes/listing.js
    - e.g. app.use("/listings", listings);

-- In routes/review.js

    - same as above for routes/listing.js
    - we need id of listing here but id will be app.js file. We will use " { mergeParams: true }", when creating router object as an option.

# Step 34 - Cookies

- 