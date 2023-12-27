// Step 33

const express = require("express");
const router = express.Router({ mergeParams: true });


const wrapAsync = require("../utils/wrapAsync.js"); // Step 18
const ExpressError = require("../utils/ExpressError.js"); // Step 19
const Review = require("../models/review.js"); // Step 26
const { reviewSchemaJoiValidator } = require("../schema.js"); // Step 28

const Listing = require("../models/listing.js");



//Step 28
const validateReview = (req, res, next) => {
    let { error } = reviewSchemaJoiValidator.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};





// Step 26  &  Step 28 - added validateReview middleware
// Reviews Post
router.post("/", validateReview, wrapAsync(async (req, res, next) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);

    listing.reviews.push(newReview);

    await listing.save();
    await newReview.save();

    res.redirect(`/listings/${listing._id}`);
}));





// Step 31
// Reviews Delete
router.delete("/:reviewId", wrapAsync(async (req, res, next) => {
    let { id, reviewId } = req.params;

    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);

    res.redirect(`/listings/${id}`);
}));



module.exports = router;