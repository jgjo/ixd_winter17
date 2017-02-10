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

router.get('/logexperiencepopup', function(req, res, next) {
  res.render('logexperiencepopup', { title: 'IXD' });
});

/* GET chat page. */
router.get('/chat', function(req, res, next) {
  res.render('chat', { title: 'IXD' });
});

/* GET viememories page. */
router.get('/viewmemories', function(req, res, next) {
  res.render('viewmemories', { title: 'IXD' });
});

/* GET viememories page. */
router.get('/viewactivity', function(req, res, next) {
  res.render('viewactivity', { title: 'IXD' });
});

/* GET about page. */
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'IXD' });
});

/* GET addActivity page. */
router.get('/addactivity', function(req, res, next) {
  res.render('addactivity', { title: 'IXD' });
});

/* GET addActivity page. */
router.get('/filterpopup', function(req, res, next) {
  res.render('filterpopup', { title: 'IXD' });
});

/* GET activity page. */
router.get('/activity', function(req, res, next) {
  res.render('activity', { title: 'IXD' });
});

/* GET activity page. */
router.get('/myprofile', function(req, res, next) {
  res.render('myprofile', { title: 'IXD' });
});

module.exports = router;
