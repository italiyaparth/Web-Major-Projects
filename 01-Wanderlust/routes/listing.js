// Step 33

const express = require("express");
const router = express.Router();


const wrapAsync = require("../utils/wrapAsync.js"); // Step 18
const ExpressError = require("../utils/ExpressError.js"); // Step 19
const Listing = require("../models/listing.js"); // Step 2
const { listingSchemaJoiValidator } = require("../schema.js"); // Step 21



// Step 22
const validateListing = (req, res, next) => {
    let { error } = listingSchemaJoiValidator.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};





// Step 4 // Step 18 - add wrapAsync
router.get("/", wrapAsync(async (req, res, next) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
}));





// Step 6 - write this above "/listing/:id" so that js understands new != :id 
router.get("/new", (req, res) => {
    res.render("listings/new.ejs");
});





// Step 5 // Step 18 - add wrapAsync  // Step 29 - add populate
router.get("/:id", wrapAsync(async (req, res, next) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    res.render("listings/show.ejs",  { listing });
}));





// Step 6 // Step 18 - add wrapAsync // Step 22 - add validateListing
router.post("/", validateListing, wrapAsync(async (req, res, next) => {

    
    //    let result = listingSchemaJoiValidator.validate(req.body);      // Step 21
    //    if (result.error) {
    //        throw new ExpressError(400, result.error);      // Step 21
    //    }
    

    let newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
}));





// Step 7 // Step 18 - add wrapAsync
router.get("/:id/edit", wrapAsync(async (req, res, next) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs",  { listing });
}));





// Step 6 // Step 18 - add wrapAsync // Step 22 - add validateListing
router.put("/:id", validateListing, wrapAsync(async (req, res, next) => {

    
    //    let result = listingSchemaJoiValidator.validate(req.body);      // Step 21
    //    if (result.error) {
    //        throw new ExpressError(400, result.error);      // Step 21
    //    }


    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    // "..." means deconstructing given object into individual key-value pairs
    res.redirect(`/listings/${id}`);
}));





// Step 8 // Step 18 - add wrapAsync
router.delete("/:id", wrapAsync(async (req, res, next) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
}));




module.exports = router;