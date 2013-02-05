var express = require('express');
var app = express();

var channels = [],
	public = __dirname + '/public',
	index = public + '/index.html';

app.use(express.static(public));

app.get('/', function(req, res) {
	res.sendfile(index);
});

app.get('/:channel', function(req, res) {
	res.sendfile(index);
});

app.get('/:channel', function(req, res) {
	res.sendfile(index);
});

app.listen(3000);
console.log('Listening on port 3000');
