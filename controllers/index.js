//index controller
var mongoose = require('mongoose');
var ServiceData = mongoose.model('ServiceData');
//get the index page when user navigates to '/' route
exports.getIndex = function(req, res) {
	return res.render('index');
};

exports.getComparePage = function(req, res) {
	return res.render('compare');
};

exports.getListPage = function(req, res) {
	return res.render('list');
};

exports.findAllServiceData = function(req, res) {
  ServiceData.find({}, function(err, results) {
  	console.log(results);
    return res.render('list', { "ServiceData": results });
  });
};

//easy import dummy data
exports.importData = function(req, res) {
  ServiceData.create({
		"name": "Turo",
		"url":{ 
			"home": "https://turo.com/",
			"signUp": "https://turo.com/sign-up",
			"terms": "https://turo.com/policies/terms"
		},
		"features":{
			"freeGas": null,
			"membershipFee": "No membership fees",
			"offersPickup": "offers pickup from airport or other locations",
			"membershipCostPerMonth": 20,
			"numberOfCarsInArea": null,
			"avgRentalPricePerHour": null,
			"avgRentalPricePerDay": null
		}
	},
    function(err) {
      if (err) return console.log(err);
      return res.sendStatus(202);
    });
};

//Handle 404 - not found
exports.notFound = function(req, res) {
	/*log.info('in 404 route...');*/
	res.sendStatus(404);
};