const mongoose = require('mongoose');

const productSchema = {
    name: String,
    price: Number,
    condition: String,
    image: String
};

module.exports = mongoose.model("Product", productSchema);