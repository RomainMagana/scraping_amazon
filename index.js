const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const app     = express();

app.get('/', function(req, res) {

    let url = req.query.url;
    if (!url) {
        res.send('No URL provided');
        return;
    }
    // decode URI url
    let url2 = decodeURIComponent(url)
    request(url2, function(error, response, html) {
        // First we'll check to make sure no errors occurred when making the request
        if (!error) {

            // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality
            let $ = cheerio.load(html);

            let image = $('#landingImage').attr('src');
            let title = $('#productTitle').text();
            let price = $('#corePrice_feature_div div span > span:first').text();

            // And now, the JSON format we are going to expose
            let json = {
                image: image.trim(),
                title: title.trim(),
                price: price.trim()
            };

            // Send the JSON as a response to the client
            res.send(json);
        }

    });

});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});

module.exports = app;