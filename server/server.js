var express = require('express');
var app = express();
var randword = require('randword');

var channels = {};

var allowCrossDomain = function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
}

app.configure(function() {
	app.use(allowCrossDomain);
});

app.get('/channel/:id', function(req, res) {
	res.json(channels[req.params.id]);
});

app.post('/channel', function(req, res) {
	randword(function(err, word) {
		channels[word] = {
			id: word,
			occupants: []
		};
		res.json(channels[word]);
	});
});

app.listen(3000);
console.log('Listening on port 3000');
