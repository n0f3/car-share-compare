//CONTROLLER - Movies
//this is where the logic of all routes is written
var mongoose = require('mongoose');
Movie = mongoose.model('Movie');
var request = require('request');
var nodemailer = require('nodemailer');

//get the index page when user navigates to '/' route
exports.getIndex = function(req, res) {
  return res.render('index');
};

exports.getProjectsPage = function(req, res) {
  return res.render('projects');
}

exports.getContactPage = function(req, res) {
  return res.render('contact');
}

exports.postContactMessage = function(req, res) {
  var mailOpts, transporter;

  transporter = nodemailer.createTransport({
    service: 'Mailgun',
    auth: {
      user: "postmaster@mg.j-levy.com",
      pass: "23a012346be704368870a72ff89570c5"
    }
  });

  //mail options
  mailOpts = {
    from: req.body.name + ' ' + req.body.email, //grab form data from the request body object
    to: 'jeremy@mg.j-levy.com',
    subject: 'Website contact form',
    text: req.body.message
  };
  console.log("Post Params: " + mailOpts.from);

  //send the message
  transporter.sendMail(mailOpts, function(error, info) {
    //Email not sent
    if (error) {
      res.render('contact', {
        msg: 'Error occured, message not sent.\n' + error,
        err: true,
        page: 'contact'
      })
    }
    //Yay!! Email sent
    else {
      res.render('contact', {  
        msg: 'Message sent! Thank you.\n' + info.response,
        err: false,
        page: 'contact'
      })
    }
  });
}

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


//delete service, respond to delete requests and updates the table via client side Ajax
exports.delMovie = function(req, res) {
  console.log(req.params.id);
  var movieId = req.params.id;
  Movie.remove({
    '_id': movieId
  }, function(err) {
    res.send((err === null) ? {
      msg: ''
    } : {
      msg: 'error' + err
    });
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

exports.getFavoritesPage = function(req, res) {
  res.render('favorites');
}

exports.getOMdbMovie = function(req, res) {
    var url = 'http://www.omdbapi.com/?t='
    var title = req.body.title;
    var searchUrl = url + title;
    console.log("in getOMdbMovie route " + searchUrl);
    request(searchUrl, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        //console.log(body);
      }
    }).on('data', function(body) {
      res.send(body);
    });

    /*request(searchUrl, function(error, response, body) {
      console.log("in request");
      response.on('error', function(e) {
        console.log("Got Error" + e);
      }).on('response', function(body) {
        console.log("in happy path response");
        console.log("Body:" + body);
      }).on('end', function() {
          console.log("ending connection to OMbd");
      });
    })*/
  }
  //Handle 404 - not found
exports.notFound = function(req, res) {
  res.sendStatus(404);
};