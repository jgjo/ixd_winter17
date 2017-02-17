var express = require('express');
var router = express.Router();

var activities = require('../public/data/activities.json');
var ownactivities = require('../public/data/ownactivities.json');
var moments = require('../public/data/moments.json');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'IXD', activitiesJSON: activities, ownactivitiesJSON: ownactivities});
});

/* GET logexperience page. */
router.get('/logexperience', function(req, res, next) {
  res.render('logexperience', { title: 'IXD', momentsJSON: moments, activitiesJSON: activities });
});

/* GET chat page. */
router.get('/chat', function(req, res, next) {
  res.render('chat', { title: 'IXD', activitiesJSON: activities});
  // res.render('testchat', { title: 'IXD' });
});

/* GET viememories page. */
router.get('/viewmemories', function(req, res, next) {
  res.render('viewmemories', { title: 'IXD' });
});

/* GET viewactivity page. */
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

/* GET filterpopup page. */
router.get('/filterpopup', function(req, res, next) {
  res.render('filterpopup', { title: 'IXD' });
});

/* GET activity page. */
router.get('/activity', function(req, res, next) {
  res.render('activity', { title: 'IXD', activitiesJSON: activities});
});

/* GET myprofile page. */
router.get('/myprofile', function(req, res, next) {
  res.render('myprofile', { title: 'IXD' });
});

/* GET login page. */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'IXD' });
});

/* GET login page. */
router.get('/test', function(req, res, next) {
  res.render('test');
});

module.exports = router;
