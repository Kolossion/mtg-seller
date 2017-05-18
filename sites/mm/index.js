var R = require('ramda');
var request = require('request');
var cheerio = require('cheerio');

var cards = []

const handleMMRes = (callback) => (err, res, body) => {
  var json_body = JSON.parse(body);

  var card_list = R.map(processMMRow, json_body)

  callback(R.reject(R.either(R.isNil, R.compose(R.equals(''), R.path(['price']))), cards));
}

const processMMRow = (elem) => {
  var name = elem.name.split(' - ')[0];
  cards.push({
    name : name,
    rarity : elem.mtg_rarity,
    foil : elem.foil,
    price : +elem.price,
    set : elem.mtg_set
  })
}


const search = (card_name, callback) => {
  request({
    method: 'POST',
    url: 'http://www.miniaturemarket.com/buyback/data/productsearch/',
    form: {search : card_name},
  }, handleMMRes(callback))
}

module.exports = {
  search
}
