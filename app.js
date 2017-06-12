var express = require('express'),
    http = require('http');

var app = express();

var allowCrossDomain = function(req, res, next) {
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

// configure
app.configure(function(){
  app.use(allowCrossDomain);
  app.set('port', process.env.PORT || 3000);
  app.use(express.static('public'))
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
});

// dev config
app.configure('development', function(){
  app.use(express.errorHandler());
});

// run the server
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
