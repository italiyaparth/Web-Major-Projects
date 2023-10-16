# Introduction

- WANDERLUST Web App is a app like AIRBNB web app ( NOT a Airbnb clone ).

- Step 1 to 8 = Basic Listings CRUD Operations with no styles
- Step 9 to 15 = Styling Listings CRUD Pages

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

- Extra Online packages ( cdn links )

  - CSS styles = Bootstrap
  - icons = FontAwesome
  - fonts =

# Step 1 - Basic Set Up

- Sub-Directories ( our main directory is "01-WANDERLUST" )

  - init = initializing our app ( Files to store sample data in database )
  - public = static files ( css stylesheets )
  - views = ejs web page files
  - models = different model files as per different styles of Schema ( collection )

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

- We write same code block for many different ejs files but now we write this code block one time and export it to these different ejs files

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
    - search for your icon copy tag: <i class="fa-regular fa-compass"></i>
    
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

--  In

    -

# Step 13 - Styling New Listing

-

--  In

    -

# Step 14 - Styling Edit Listing

-

--  In

    -

# Step 15 - Styling Show Listing

-

--  In

    -