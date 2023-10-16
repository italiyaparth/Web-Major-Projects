const mongoose = require("mongoose"); // Step 2

const Schema = mongoose.Schema; // Step 2

// Step 2
const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String, //  URL
    default:
      "https://images.unsplash.com/photo-1584824486509-112e4181ff6b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    set: (userImage) =>
      userImage === ""
        ? "https://images.unsplash.com/photo-1584824486509-112e4181ff6b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
        : userImage,
    // user uploaded image, and uploaded in our different database which stores only images but from there URL link didn't come then default image will come from here
  },
  price: {
    type: Number,
  },
  location: {
    type: String,
  },
  country: {
    type: String,
  },
});

// Step 2
const Listing = mongoose.model("Listing", listingSchema);

//Step 2
module.exports = Listing;
