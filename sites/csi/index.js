var R = require('ramda');
var request = require('request');
var cheerio = require('cheerio');

var cards = []

const handleCSIRes = (callback) => (err, res, body) => {
  var json_body = JSON.parse(body)
  const $ = cheerio.load(json_body.shtml)
  $('.productSetDisplay > table > tr').each(processCSITableRow($));

  callback(R.reject(R.either(R.isNil, R.compose(R.equals(''), R.path(['price']))), cards));
}

const processCSITableRow = R.curry(($, i, elem) => {
  if(R.not(R.isNil($(elem).data('rarity')))) {
    price_elem = 'td.vt.r > table > tr:nth-child(2) > td.vt.r';
    foil_elem = '.foil';
    rarity_data = 'rarity';
    name_elem = '.productLinkSpan > b';
    set_elem = '.search_details';

    processSetName = (search_text) => {
      var tokens = search_text.split(' > ');
      return tokens[0];
    }

    parsePrice = (price_str) => {
      return Number(price_str.replace(/[^0-9\.]+/g,""));
    }

    cards[i] = {
      name : $(elem).find(name_elem).text(),
      rarity : $(elem).data(rarity_data),
      foil : $(elem).find(foil_elem).length >= 1 ? true : false,
      price : parsePrice($(elem).find(price_elem).text().trim()),
      set : processSetName($(elem).find(set_elem).text())
    }
  } 
})


const search = (card_name, callback) => {
  return request({
    url: "http://www.coolstuffinc.com/ajax_buylist.php",
    qs: {
      ajaxdata: card_name,
      ajaxtype: "selectsearchgamename",
    }
  }, handleCSIRes(callback))
}

module.exports = {
  search
}
