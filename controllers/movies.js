//CONTROLLER - Movies
var mongoose = require('mongoose');
Movie = mongoose.model('Movie');

exports.findAllMovies = function(req, res) {
    Movie.find({}, function(err, results) {
        return res.render('movies', {
            "movielist": results
        });
    });
};

/* POST to Add User Service */
exports.addMovie = function(req, res) {

    // Get our form values. These rely on the "name" attributes
    var title = req.body.title;
    var year = req.body.year;
    var genre = req.body.genre;

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
            res.redirect("movies");
        }
    });
};

exports.deleteMovies = function(req, res, next) {
    console.log('in delete');
    //console.log("Params " + req.params.id);
    var movieId = req.params.id;
    Movie.remove({"_id": movieId}, function(err, movie) {
        if( err ){ 
            return next( err ); 
        } else
        console.log('Deleted ' + movieId);
        res.redirect('movies');
    });
};

/*exports.deleteMovies = function(req, res, next) {
    console.log('in delete');
    Movie.findById(req.params.id, function(movie, err) {
        console.log("Params " + req.params.id + " " + movie);
        movie.remove(function(movie, err) {
            console.log('Deleted');
            if( err ) return next( err );
            res.redirect('movies');
        });
    });
};*/

/*exports.deleteMovies = function(req, res) {
    console.log('in delete');
    var id = req.params.id;
    //var mid = req.body.id;
    Movie.remove({
        '_id': id
    }, function(results) {
        console.log('Deleted');
        return res.send(results);
    });
};*/

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
            return res.send(202);
        });
};