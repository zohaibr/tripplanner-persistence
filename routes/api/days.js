var router = require('express').Router();
var db = require('../../models/index');
var Hotel = require('../../models/hotel');
var Restaurant = require('../../models/restaurant');
var Activity = require('../../models/activity');
var Day = require('../../models/day')

router.get('/api/days', function(req, res, next) {
  Day.findAll()
  .then((days) => res.send(days))
  .catch(next)
});

router.post('/api/days', function(req, res, next) {
  Day.create({
    number: 1
  }).then((days) => res.send(days))
  .catch(next);
});

router.delete('/api/days', function(req, res, next) {

});

module.exports = router;
