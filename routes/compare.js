var express = require('express');
var router = express.Router();

/* GET compare page. */
router.get('compare', function(req, res, next) {
  res.render('compare');
});

module.exports = router;