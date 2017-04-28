//Markets = new Mongo.Collection("markets");

Meteor.methods({

  /** 
   * submit a get request to the restful service zipSearch or locSearch.
   */
  getMarkets: function(zipcode) {
    check(zipcode, String);

    var marketsApi = 'http://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=' + zipcode;

    return Meteor.http.get(
      marketsApi,
      marketsApiCallback
    );
  }
});

if (Meteor.isClient) {
  var _zipcode = '58102';

  // calls 'getMarkets' on the server...
  // which in turn makes an http.get call to the USDA api...
  // which in turn invokes a async callback...
  // which in turn sets a session variable!
  // TODO: zip code would be user-supplied (search form)
  Meteor.call('getMarkets', _zipcode);
  
  Template.body.helpers({
    zipcode: _zipcode,
    markets: function() {
      // and here we use that session variable :P
      return Session.get('markets');
    }
  });
}


// I don't really know the best place for these (plain old) functions yet


/**
 * the async callback used by Meteor.http.get within 'getMarkets'
 */
function marketsApiCallback(error, results) {
  // Session approach/pattern
  Session.set(
    'markets', 
    //results.data.results.forEach(split_distance_marketname)
    // use .map() instead
    results.data.results.map(split_distance_marketname)
  );
}

/**
 * USDA search results have a 'marketname' element
 * that is comprised of distance-in-miles and actual market name, in one string
 */
function split_distance_marketname(market) {
  market.distance = market.marketname.match(/(\d+.\d+)/g)[0]; //  /(\d+)/g
  market.marketname = market.marketname.substr(market.distance.length + 1);// adjusted
  return market;
}
