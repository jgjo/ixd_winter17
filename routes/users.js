var express = require('express');
var router = express.Router();
var dataFile = require('../public/data/activities.json');

/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource'); 
  res.render('myprofile', { }); 
});
router.get('/:id', function(req, res, next) {
  var actdata = dataFile.activities;
  var userid= req.params.id;
  console.log("user id: "+userid);
  //console.log(actdata); 

  actdata.forEach(function (entry) {
    if(entry.id=== parseInt(userid)){
      console.log(entry.id);
      res.render('my', {
        name : entry.hostName,
        description : entry.description,
        location : entry.name
      });
    }
  });
  res.send('respond with a resource');
});
module.exports = router; 
