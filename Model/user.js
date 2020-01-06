const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    fullName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
    },
    mobilePhone: {
        type: String,
        required: true
    },
    streetName: {
        type: String,
    },
    areaLocation: {
        type: String,
        required: true,
    },
    cityName: {
        type: String,
        required: true,
    },
    image: {
        type: String
    },
});

module.exports = mongoose.model('User', userSchema);