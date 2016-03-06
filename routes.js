//ROUTES
module.exports = function(app){
    /*var musicians = require('./controllers/musicians');
    app.get('/musicians', musicians.findAll);
    app.get('/musicians/:id', musicians.findById);
    app.post('/musicians', musicians.add);
    app.put('/musicians/:id', musicians.update);
    app.delete('/musicians/:id', musicians.delete);
    app.get('/import', musicians.import);*/

    var movies = require('./controllers/movies');
    app.get('/movies', movies.findAllMovies);
    app.post('/addmovie', movies.addMovie);
    app.get('/movies/:id', movies.deleteMovies);
    app.get('/import/movies', movies.importMovies)
}