Markets = new Mongo.Collection("markets");

Meteor.methods({

  /** 
   * submit a get request to the restful service zipSearch or locSearch.
   * @param  {[type]} zip [description]
   * @return {[type]}     [description]
   */
  getMarkets: function(zipcode) {
    check(zipcode, String);
    var marketsApi = 'http://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=' + zipcode;

    //this.unblock();
    return Meteor.http.get( marketsApi );
    /*
      function (error, results) {
        console.log('getMarkets async callback');
        return results;
      }*/
    //);
  }
});


if (Meteor.isClient) {

  Template.body.helpers({
    marketsNear: [
      {
        'id': '1002706',
        'marketname': 'Downtown Festival Market'  
      },
      {
        'id': '1007642',
        'marketname': 'Gardener\'s Flea Market',
      }
    ]

    /*Meteor.call(
      'getMarkets',
      '58102',
      function(error, result) {
        //console.log('Meteor.call async callback now');
        //console.log(result.data);
        return result.data;
      }
    )*/
  });

  //console.log('about to startup');
  Meteor.startup(function () {
    // code to run on client at startup
    // 
    /*
    console.log('about to call usda');
    
    var marketsNear = Meteor.call(
      'getMarkets',
      '58102',
      function(error, result) {
        console.log('Meteor.call async callback now');
        console.log(result.data);
        //return result.data;
      }
    );
    */
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  }); 
}
