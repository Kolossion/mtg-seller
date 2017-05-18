var R = require('ramda');
var argv = require('minimist')(process.argv.slice(2));
var Sites = require('./sites');

var cards = {};

const main = () => {
  card_name = argv.name;

  Sites.CSI.search(card_name, card_add_callback('csi'));
  Sites.MM.search(card_name, card_add_callback('mm'));
  // @TODO : Add scrapers for other sites.
  //Sites.CF.search(card_name, card_add_callback('cf'));
  //Sites.CK.search(card_name, card_add_callback('ck'));
}

const card_add_callback = R.curry((key, new_cards) => {
  cards[key] = new_cards;
  console.log(cards);
})

if (require.main === module) {
  main();
}
