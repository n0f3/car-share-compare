//ROUTES
module.exports = function(app){

    var indexController = require('./controllers/index');

    app.get('/', indexController.getIndex);

    app.get('/compare', indexController.getComparePage);
    app.post('/compare', indexController.postCompareData);

    //app.get('/list', indexController.getListPage);
    app.get('/list', indexController.findAllServiceData);
    //route to import dummy data

    app.get('/import/data', indexController.importData);

    //catch 404
    app.use('*', indexController.notFound);
};