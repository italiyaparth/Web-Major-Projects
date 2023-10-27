const express = require("express"); // Step 1
const app = express(); // Step 1
const mongoose = require("mongoose"); // Step 1
const path = require("path");   // Step 4
const methodOverride = require("method-override");   // Step 7
const ejsMate = require("ejs-mate");   // Step 9

const Listing = require("./models/listing.js"); // Step 2
const wrapAsync = require("./utils/wrapAsync.js"); // Step 18
const ExpressError = require("./utils/ExpressError.js"); // Step 19
const { listingSchema } = require("./schema.js"); // Step 21

app.set("view engine", "ejs");      // Step 4
app.set("views", path.join(__dirname, "views"));    // Step 4

app.use(express.urlencoded( { extended: true } ));  // Step 5
app.use(methodOverride("_method"));  // Step 7
app.use(express.static(path.join(__dirname,"public"))); // Step 9

app.engine("ejs", ejsMate);     // Step 9

// Step 1
app.listen(8080, () => {
  console.log("Server is listening to port 8080");
});

// Step 1
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

// Step 1
async function main() {
  await mongoose.connect(MONGO_URL);
}

// Step 1
main()
.then( () => console.log("MongoDB connection successful") )
.catch( (err) => console.log(err) );

// Step 22
const validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};

// Step 4 // Step 18 - add wrapAsync
app.get("/listings", wrapAsync(async (req, res, next) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
}));


// Step 6 - write this above "/listing/:id" so that js understands new != :id 
app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs");
});

// Step 5 // Step 18 - add wrapAsync
app.get("/listings/:id", wrapAsync(async (req, res, next) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs",  { listing });
}));

// Step 6 // Step 18 - add wrapAsync // Step 22 - add validateListing
app.post("/listings", validateListing, wrapAsync(async (req, res, next) => {

    /*
        let result = listingSchema.validate(req.body);      // Step 21
        if (result.error) {
            throw new ExpressError(400, result.error);      // Step 21
        }
    */

    let newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
}));

// Step 7 // Step 18 - add wrapAsync
app.get("/listings/:id/edit", wrapAsync(async (req, res, next) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs",  { listing });
}));

// Step 6 // Step 18 - add wrapAsync // Step 22 - add validateListing
app.put("/listings/:id", validateListing, wrapAsync(async (req, res, next) => {

    /*
        let result = listingSchema.validate(req.body);      // Step 21
        if (result.error) {
            throw new ExpressError(400, result.error);      // Step 21
        }
    */

    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    // "..." means deconstructing given object into individual key-value pairs
    res.redirect(`/listings/${id}`);
}));

// Step 8 // Step 18 - add wrapAsync
app.delete("/listings/:id", wrapAsync(async (req, res, next) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
}));

// Step 19
app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found!"));
});

// Step 18
app.use((err, req, res, next) => {

    // res.send("something went wrong!");

    // Step 19
    // let { statusCode = 500, message = "Something went Wrong!" } = err;
    // res.status(statusCode).send(message);

    // Step 20
    let { statusCode = 500, message = "Something went Wrong!" } = err;
    res.status(statusCode).render("error.ejs", { message });
});