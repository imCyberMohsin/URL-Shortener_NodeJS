const express = require('express');
const mongoose = require('mongoose');
const shortUrl = require('./models/shortUrl')
const app = express();

// Database connection
mongoose.connect("mongodb://127.0.0.1:27017/urlShortenerNodejs", {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.on('open', () => console.log("Connected To DB"));

// View Engine
app.set('view engine', 'ejs')
// url in express
app.use(express.urlencoded({ extended: false }))

// Home Routes
app.get('/', async (req, res) => {
    const shortUrls = await shortUrl.find();
    res.render("index", { shortUrls: shortUrls });
})

// URL Shortener Route
app.post('/shortUrl', async (req, res) => {
    await shortUrl.create({
        full: req.body.fullUrl,
    })
    res.redirect('/');
})

// Route to open Full URL using the Short-URL
app.get('/:shortUrl', async (req, res) => {
    const foundUrl = await shortUrl.findOne({ short: req.params.shortUrl })

    // Error Check
    if (foundUrl === null) return res.status(404)

    foundUrl.clicks++;
    foundUrl.save();

    // redirect to full URL
    res.redirect(foundUrl.full);

})

app.listen(3000);
console.log(`Listening on Port 3000`);