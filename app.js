var express = require('express');
var http = require('http');
var favicon = require('serve-favicon');
var compression = require('compression');
var jsonServer = require('json-server');

var app = express();
var server = http.Server(app);

app.set('port', 7575);
app.use(favicon(__dirname + '/src/favicon.ico'));

// Enable compression of responses
app.use(compression());

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
