//index controller

//get the index page when user navigates to '/' route
exports.getIndex = function(req, res) {
	return res.render('index');
};

exports.getComparePage = function(req, res) {
	return res.render('compare');
};

exports.getListPage = function(req, res) {
	return res.render('list');
};

//Handle 404 - not found
exports.notFound = function(req, res) {
	/*log.info('in 404 route...');*/
	res.sendStatus(404);
};