//MODELS - Movie
var mongoose = require('mongoose');
Schema = mongoose.Schema;

var MoviesSchema = new Schema({
	title: String,
	year: String,
	genre: String
});

mongoose.model('Movie', MoviesSchema);
