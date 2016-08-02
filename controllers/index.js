//index controller
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var ServiceData = mongoose.model('ServiceData');
//get the index page when user navigates to '/' route
exports.getIndex = function(req, res) {
	return res.render('index');
};

exports.getComparePage = function(req, res) {
	return res.render('compare', {"services": app.locals.services });
};

exports.postCompareData = function(req, res){
	var serviceName = req.body['selSrv[]'];
	console.log(serviceName);
	ServiceData.find({'_id': { $in: serviceName }}, function(err, results){
		if(err){
			console.log("Error is " +err);
			res.send((err === null) ? { msg: ''} : { msg: 'Error, ' + err});		
		}else{
			app.locals.services = results;
	  		//console.log("results are " + results);
			//res.render('compare', {"services":results});
			res.end();
		}
	});
};

exports.getListPage = function(req, res) {
	return res.render('list');
};

exports.findAllServiceData = function(req, res) {
  ServiceData.find({}, function(err, results) {
  	//console.log("results are " + results);
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
		"logo": "/images/assets/logos/turo.png",
		"features":{
			"freeGas": "Gas not included",
			"membershipFee": "No membership fees",
			"offersPickup": "offers pickup from airport or other locations",
			"membershipCostPerMonth": 20,
			"numberOfCarsInArea": null,
			"avgRentalPricePerHour": null,
			"avgRentalPricePerDay": null
		}
	},
	{
		"name": "Getaround",
		"url":{ 
			"home": "https://www.getaround.com/",
			"signUp": "https://www.getaround.com/",
			"terms": "https://www.getaround.com/terms"
		},
		"logo": "/images/assets/logos/getaround.png",
		"features":{
			"freeGas": "Gas is not included",
			"membershipFee": "No membership fees",
			"offersPickup": null,
			"membershipCostPerMonth": null,
			"numberOfCarsInArea": null,
			"avgRentalPricePerHour": null,
			"avgRentalPricePerDay": null
		}
	},
	{
		"name": "Zipcar",
		"url":{ 
			"home": "https://www.zipcar.com/",
			"signUp": "https://www.zipcar.com/",
			"terms": "https://www.zipcar.com/"
		},
		"logo": "/images/assets/logos/zipcar.png",
		"features":{
			"freeGas": "Gas is included",
			"membershipFee": "Membership fees apply",
			"offersPickup": null,
			"membershipCostPerMonth": 3,
			"numberOfCarsInArea": null,
			"avgRentalPricePerHour": null,
			"avgRentalPricePerDay": null
		}
	},
	{
		"name": "City Share",
		"url":{ 
			"home": "https://www.gocarma.com/",
			"signUp": "https://www.gocarma.com/",
			"terms": "https://www.gocarma.com/"
		},
		"logo": "/images/assets/logos/cityshare.png",
		"features":{
			"freeGas": "Gas is included",
			"membershipFee": "Membership fees apply",
			"offersPickup": null,
			"membershipCostPerMonth": 3,
			"numberOfCarsInArea": null,
			"avgRentalPricePerHour": null,
			"avgRentalPricePerDay": null
		}
	},
	{
		"name": "Enterprise CarShare",
		"url":{ 
			"home": "https://www.enterprisecarshare.com/us/en/home.html",
			"signUp": "https://www.enterprisecarshare.com/us/en/home.html",
			"terms": "https://www.enterprisecarshare.com/us/en/home.html"
		},
		"logo": "/images/assets/logos/enterprise.png",
		"features":{
			"freeGas": "Gas is included",
			"membershipFee": "Membership fees apply",
			"offersPickup": null,
			"membershipCostPerMonth": 3,
			"numberOfCarsInArea": null,
			"avgRentalPricePerHour": null,
			"avgRentalPricePerDay": null
		}
	},
	{
		"name": "Car2Go",
		"url":{ 
			"home": "https://www.car2go.com/US/en/",
			"signUp": "https://www.car2go.com/US/en/",
			"terms": "https://www.car2go.com/US/en/"
		},
		"logo": "/images/assets/logos/car2go.png",
		"features":{
			"freeGas": "Gas not included",
			"membershipFee": "No membership fees",
			"offersPickup": null,
			"membershipCostPerMonth": null,
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