// Step 2

const mongoose = require("mongoose");

const Schema = mongoose.Schema;


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


const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
