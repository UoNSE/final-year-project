var express = require('express');
var http = require('http');
var https = require('https');
var fs = require('fs');
var favicon = require('serve-favicon');
var compression = require('compression');
var jsonServer = require('json-server');
var lessMiddleware = require('less-middleware');

var options = {
    key: fs.readFileSync('/Users/juliusskye/Documents/FYP/src/ssl.pem'),
    cert: fs.readFileSync('/Users/juliusskye/Documents/FYP/src/ssl-cert.pem'),
    requestCert: false,
    rejectUnauthorized: false
};

var app = express();
// var server = http.Server(app);
var server = https.createServer(options, app);

// port for http server
// app.set('port', 7575);

// port for https server
app.set('port', 7576);

app.use(favicon(__dirname + '/src/favicon.ico'));

// Enable compression of responses
app.use(compression());

// Compile .less files to .css
app.use(lessMiddleware(__dirname + '/src'));

// Serve static files such as HTML, CSS, JavaScript, etc
app.use(express.static(__dirname + '/src'));

// Mock rest API
app.use('/api', jsonServer.router('db.json'));

// Direct all non-static traffic to index.html
// The client-side backbone router handles the loading of content
app.get('*', function (req, res){
    res.sendFile(__dirname + '/src/index.html');
});

// Start the web server
server.listen(app.get('port'), function () {
	console.log("Express server listening on port " + app.get('port'));
});
