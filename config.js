'use strict';

var request = require("request"),
    url = require('url'),
    qs = require('querystring'),
    templete;

exports = module.exports = function(app, express) {
console.log(app.DEPLOY);
  request = request.defaults({
      jar: true
  });
  app.configure(function() {
      app.use(express.cookieParser());
      app.use(express.bodyParser());
      app.use(express.json());
      app.use(express.urlencoded());
      app.use(express.methodOverride());
      app.use(express.favicon());

      app.use(app.router);

      templete = '/www/index.html';

      app.use("/", express.static('www/'));

      app.get('/[^\.]+$', function(req, res){
        res.set('Content-Type', 'text/html')
            .sendfile(__dirname + templete);
      });

  });
};
