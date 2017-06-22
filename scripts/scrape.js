const express = require("express");
const cheerio = require("cheerio");
const request = require("request");

let ScrapeFunction = (cb) => {
    // grab the body of the html with request
    request("https://news.google.com/", function(error, response, html) {
        // grab html from google
        let articlesTotal = [];
        let $ = cheerio.load(html);
        //find news article
        $('div .blended-wrapper').each(function() {
            let articleBody = {
                headline: $(this).find('h2').text(),
                link: $(this).find('h2').children('a').attr('href'),
                snippet: $(this).find('.esc-lead-snippet-wrapper').text()
            };
            articlesTotal.push(articleBody)
        });

        //send all array of data via callback function
        cb(articlesTotal);
    });
}

module.exports = ScrapeFunction;
