const express = require("express"); // Step 1
const app = express(); // Step 1
const mongoose = require("mongoose"); // Step 1
const path = require("path");   // Step 4
const methodOverride = require("method-override");   // Step 7
const ejsMate = require("ejs-mate");   // Step 9

const Listing = require("./models/listing.js"); // Step 2

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

// Step 4
app.get("/listings", async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
});


// Step 6 - write this above "/listing/:id" so that js understands new != :id 
app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs");
});

// Step 5
app.get("/listings/:id", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs",  { listing });
});

// Step 6
app.post("/listings", async (req, res) => {
    let newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
});

// Step 7
app.get("/listings/:id/edit", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs",  { listing });
});

// Step 7
app.put("/listings/:id", async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    // "..." means deconstructing given object into individual key-value pairs
    res.redirect(`/listings/${id}`);
});

// Step 8
app.delete("/listings/:id", async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
});