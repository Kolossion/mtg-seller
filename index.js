var R = require('ramda');
var request = require('request');
var cheerio = require('cheerio');

var cardNames = []

const handleRes = (err, res, body) => {
  var phtml = JSON.parse(body)
  const $ = cheerio.load(phtml.phtml)
  var productLinkSpanBolds = $('.productSetDisplay .productLinkSpan > b').each((i, elem) => {
    cardNames[i] = $(elem).text();
  })

  console.log(cardNames)
}

request({
  url: "http://www.coolstuffinc.com/ajax_buylist.php",
  qs: {
    ajaxdata: "Amonkhet",
    ajaxtype: "selectProductSetName",
    ajaxgame: "mtg"
  }
}, handleRes)


