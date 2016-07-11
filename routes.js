//ROUTES
module.exports = function(app){

    var indexController = require('./controllers/index');

    app.get('/', indexController.getIndex);
    app.get('/compare', indexController.getComparePage);
    app.get('/list', indexController.getListPage);


    app.use('*', indexController.notFound);
};