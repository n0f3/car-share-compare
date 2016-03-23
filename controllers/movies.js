//CONTROLLER - Movies
//this is where the logic of all routes is written
var mongoose = require('mongoose');
Movie = mongoose.model('Movie');

//get the index page when user navigates to '/' route
exports.getIndex = function(req, res) {
    return res.render('index');
};

//get resume page when user navigates to 'resume'
exports.getResume = function(req, res) {
    return res.render('resume')
}

//get all movies when user navigates to '/movies'
exports.findAllMovies = function(req, res) {
    Movie.find({}, function(err, results) {
        return res.render('movies', {
            "movielist": results
        });
    });
};

//grab the text user inputs in the form and when user clicks submit send that infor with the request to the POST service
//then create new row for the new movie 
exports.addMovie = function(req, res) {

    // Get our form values. These rely on the "name" attributes
    var title = req.body.title;
    var year = req.body.year;
    var genre = req.body.genre;
    console.log(req.body);
    console.log(title, year, genre);
    // Submit to the DB
    Movie.create({
        "title": title,
        "year": year,
        "genre": genre
    }, function(err, results) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database. " + err);
        } else {
            // And forward to success page
            console.log("Added " + title + " " + year + " " + genre);
            //TODO - instead we want to use an Ajax call here to only refresh the table
            //res.redirect("movies");
        }
    });
};


//delete service, respones to delete requests and updates the table via client side Ajax
exports.delMovie = function(req, res) {
    console.log(req.params.id);
    var movieId = req.params.id;
    Movie.remove({
        '_id': movieId
    }, function(err) {
        res.send((err === null) ? { msg: ''} : {msg: 'error' + err});
    });
};

exports.importMovies = function(req, res) {
       Movie.create({
               "title": "Titanic",
               "year": "1998",
               "genre": "drama"
           }, {
               "title": "Pulp Fiction",
               "year": "1999",
               "genre": "action"
           }, {
               "title": "Avatar",
               "year": "2012",
               "genre": "fantasy"
           },
           function(err) {
               if (err) return console.log(err);
               return res.sendStatus(202);
           });
};

//Handle 404 - not found
exports.notFound = function(req, res) {
    res.sendStatus(404);
};