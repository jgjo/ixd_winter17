var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'IXD' });
});

/* GET logexperience page. */
router.get('/logexperience', function(req, res, next) {
  res.render('logexperience', { title: 'IXD' });
});

/* GET chat page. */
router.get('/chat', function(req, res, next) {
  res.render('chat', { title: 'IXD' });
});

/* GET viememories page. */
router.get('/viewmemories', function(req, res, next) {
  res.render('viewmemories', { title: 'IXD' });
});

/* GET about page. */
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'IXD' });
});

module.exports = router;
