// require necessary modules
var express = require('express'),
    http = require('http'),
    request = require('request');

// get an instance of express
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

// configure it
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


// index route
// app.get('/', index);


// GET User Info
// `/user/:username`
// app.get('/', function(req, res, next) {
//   res.send('hello world');
//   var url = githubURL + 'users/' + req.params.username;
//   request({ url: url, headers: githubHeaders },
//     function (error, response, body) {
//       if (!error && response.statusCode == 200) {
//         res.setHeader('Content-Type', 'application/json');
//         res.send(body);
//       }
//     }
//   );
// });
//
// // GET Repos for Org
// // `/repos/:username`
// app.get('/repos/:username', function (req, res, next) {
//
// });

// run the server
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
