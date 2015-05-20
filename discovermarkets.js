Markets = new Mongo.Collection("markets");


if (Meteor.isClient) {
  // counter starts at 0
  //Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  }); 
}

function marketsCallback(results) {
  console.log(results);
}

if (Meteor.isClient) {
  console.log('about to startup');
  Meteor.startup(function () {
    // code to run on server at startup

    console.log('about to call usda');
    var zip = '58102';
    $.get({
      //type: "GET",
      contentType: "application/json; charset=utf-8",
      // submit a get request to the restful service zipSearch or locSearch.
      url: "http://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=" + zip,
      // or
      // url: "http://search.ams.usda.gov/farmersmarkets/v1/data.svc/locSearch?lat=" + lat + "&lng=" + lng,
      dataType: 'jsonp',
      jsonpCallback: 'marketsCallback'
    });
  });
}
