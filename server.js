#!/bin/env node
var express = require('express'),
	//compression = require('compression'),
	minify = require('express-minify'),
    fs = require('fs'),
    app = express(),
    PRODUCTION = false,
    DEPLOY = process.argv[2] == 'deploy' ? true : false,
    DEV = process.env.DEV === 'true' ? true: false,
    SERVER_UNDER_MAINTENANCE = process.env.SERVER_UNDER_MAINTENANCE === 'true' ? true: false,
    PORT = Number(process.env.PORT || 8080),
    SERVER = String(process.env.SERVER_NAME || 'localhost');


app.SERVER = SERVER;
app.PORT = PORT;

app.SERVER_PATH = 'http://' + app.SERVER + ':' + app.PORT;

app.DEPLOY = DEPLOY;
app.DEV = DEV;
// FI-1410
app.SERVER_UNDER_MAINTENANCE = SERVER_UNDER_MAINTENANCE;
if (app.DEPLOY) {
    // compress all requests
    app.use(express.compress());
    // minify css and js
    app.use(minify());
}


require('./config')(app, express);

//  Start the app on the specific interface (and port).
app.listen(PORT, function() {
    console.log('%s: Node server started on port: %d...',
        Date(Date.now()), PORT);
});
