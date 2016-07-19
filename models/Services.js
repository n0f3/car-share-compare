//services model
//require mongoose
var mongoose = require('mongoose');
Schema = mongoose.Schema;

//--------------------------------Start Favorites Schema ------------------------------

var ServiceSchema = new Schema({
	name: String,
	url:{ 
		home: String,
		signUp: String,
		terms: String
	},
	features:{
		freeGas: String,
		membershipFee: String,
		offersPickup: String,
		membershipCostPerMonth: Number,
		numberOfCarsInArea: Number,
		avgRentalPricePerHour: Number,
		avgRentalPricePerDay: Number
	}
});

//tell mongoose that from now on we will refer to this collection as 'ServiceData' using the schema 'ServiceSchema'
mongoose.model('ServiceData', ServiceSchema);