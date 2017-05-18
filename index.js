var R = require('ramda');
var argv = require('minimist')(process.argv.slice(2));
var Sites = require('./sites');

var cards = {};

const main = () => {
  console.log(argv);
  card_name = argv.name;

  Sites.CSI.search(card_name, card_add_callback('csi'));
  // @TODO : Add scrapers for other sites.
  //Sites.CF.search(card_name, card_add_callback('cf'));
  //Sites.MM.search(card_name, card_add_callback('mm'));
  //Sites.CK.search(card_name, card_add_callback('ck'));
}

const card_add_callback = R.curry((key, new_cards) => {
  console.log("WE HIT THIS.");
  cards[key] = new_cards;
  console.log(cards);
})

if (require.main === module) {
  main();
}
