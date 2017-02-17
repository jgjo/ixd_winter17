var express = require('express');
var router = express.Router();

var activities = require('../public/data/activities.json');
var ownactivities = require('../public/data/ownactivities.json');
var moments = require('../public/data/moments.json');
var id = 105;
var hostID = 69;
var location = {
  "lat": 32.712705,
  "lng": -117.162629
};


/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('Activities length: ' + activities.activities.length);
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


router.post('/api/activity', function (req, res) {
  if (!(req.body.name && req.body.description && req.body.maxCost && req.body.maxTimeInMin
    && req.body.childsafe && req.body.outdoor && req.body.alcohol && req.body.food)) {
    return res.status(400).json({error: 'Missing fields'});
  }

  var newActivity = {
    own: 1,
    id: id++,
    name: req.body.name,
    description: req.body.description,
    hostName: 'Mia Sunny',
    hostID: hostID++,
    maxCost: req.body.maxCost,
    maxTimeInMin: req.body.maxTimeInMin,
    location: location,
    pictures: [{"src": "https://res.cloudinary.com/din6mjlbd/image/upload/v1487334028/dummy_host4_v2wfpn.jpg"}],
    filters: [
      {"name":"childsafe", "value": req.body.childSafe},
      {"name":"outdoor", "value": req.body.outdoor},
      {"name":"alcohol", "value": req.body.alcohol},
      {"name":"food", "value": req.body.food}
    ]
  };
  location.lat = location.lat + 0.01;
  location.lng = location.lng + 0.01;
  activities.activities.push(newActivity);
  res.sendStatus(200);
});

module.exports = router;
