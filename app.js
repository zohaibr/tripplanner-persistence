var express = require('express');
var volleyball = require('volleyball');
var bodyParser = require('body-parser');
var nunjucks = require('nunjucks');
var path = require('path');

var db = require('./models');

var app = express();

// nunjucks rendering boilerplate
nunjucks.configure('views', { noCache: true });
app.set('view engine', 'html');
app.engine('html', nunjucks.render);

// logging and body-parsing
app.use(volleyball);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// statically serve front-end dependencies
app.use('/bootstrap', express.static(path.join(__dirname, '/node_modules/bootstrap/dist')));
app.use('/jquery', express.static(path.join(__dirname, '/node_modules/jquery/dist')));

// serve any other static files
app.use(express.static(path.join(__dirname, '/public')));

// serve dynamic routes

app.use(require('./routes'));
app.use(require('./routes/api/attractions'))
app.use(require('./routes/api/days'))

// failed to catch req above means 404, forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// handle any errors
app.use(function (err, req, res, next) {
  console.error(err, err.stack);
  res.status(err.status || 500);
  res.render('error', {
    error: err
  });
});

// listen on a port
var port = 3000;
app.listen(port, function () {
  console.log('The server is listening closely on port', port);
  db.sync()
  .then(function () {
    console.log('Synchronated the database');
  })
  .catch(function (err) {
    console.error('Trouble right here in River City', err, err.stack);
  });
});
