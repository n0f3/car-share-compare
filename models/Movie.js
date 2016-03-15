//MODELS - Movie
//require mongoose
var mongoose = require('mongoose');
Schema = mongoose.Schema;

//create new mongoose schema object with the properties needed for the 'Movie' collection
var MoviesSchema = new Schema({
	title: String,
	year: String,
	genre: String
});

//tell mongoose that from now on we will refer to this collection as 'Movie' using the schema 'MoviesSchema'
mongoose.model('Movie', MoviesSchema);
