var router = require('express').Router();
var db = require('../../models/index');
var Hotel = require('../../models/hotel');
var Restaurant = require('../../models/restaurant');
var Activity = require('../../models/activity');

router.get('/api/hotels', function(req, res, next){
  Hotel.findAll({})
  .then(function(theHotelsThatWeFound){
    res.send(theHotelsThatWeFound);
  })
  .catch(next);
})

router.get('/api/activities', function(req, res, next){
  Activity.findAll({})
  .then(function(activities){
    res.send(activities);
  })
  .catch(next);
})

router.get('/api/restaurants', function(req, res, next){
  Restaurant.findAll({})
  .then(function(restaurants){
    res.send(restaurants);
  })
  .catch(next);
})


module.exports = router;
