//* Model and Schema of Short URL 
const mongoose = require('mongoose');
const shortid = require('shortid');

// Create Schema
const shortUrlSchema = new mongoose.Schema({
    full: {
        type: String,
        required: true,
    },
    short: {
        type: String,
        required: true,
        default: shortid.generate,  // create short url using 'shortid'
    }, 
    clicks:{
        type: Number,
        required: true,
        default: 0,
    }
})


// Export the model
module.exports = mongoose.model('shortUrl', shortUrlSchema);