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
    //app.get('/error', movies.getError);
    //home page route
    app.get('/', movies.getIndex);
    app.get('/movies', movies.findAllMovies);
    //add route
    app.post('/addmovie', movies.addMovie);
    //delete route
    //app.get('/movies/:id', movies.deleteMovies);
    app.delete('/deleteMovie/:id', movies.delMovie);
    app.get('/projects', movies.getProjectsPage);
    app.get('/import/movies', movies.importMovies);
    app.get('/resume', movies.getResume);
    app.get('/contact', movies.getContactPage);
    app.post('/contact', movies.postContactMessage);
    //routes for movie search of OMdb
    app.get('/favorites', movies.getFavoritesPage);
    app.post('/searchFavorites', movies.getOMdbMovie)
    app.use('*', movies.notFound);
}