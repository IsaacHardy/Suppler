const express          = require('express');
const http             = require('http');
const bodyParser       = require('body-parser');
const validator        = require('express-validator');

const mustacheExpress  = require("mustache-express");
const session          = require("express-session");
const routes           = require("./routes");
const path             = require("path");

const app              = express();

const allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
     res.send(200);
    }
    else {
      next();
    }
};

// Middlewares and things
app.use(allowCrossDomain);
app.set('port', process.env.PORT || 3000);
app.engine('mustache', mustacheExpress());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'mustache');
app.set('layout', 'layout');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(validator());
app.use(session({
  secret: 'thisisasecret',
  resave: true,
  saveUninitialized: true
}));
app.use(routes);

// run the server
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
