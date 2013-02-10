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
	app.use(express.bodyParser());
});

app.post('/channel', function(req, res) {
	var occupant = req.body.occupant;
	if (occupant && occupant.id) {
		randword(function(err, word) {
			var channel = channels[word] = {
				id: word,
				occupants: [occupant]
			};
			res.json(channel);
		});
	} else {
		res.json(403, {error: 'Invalid occupant'});
	}
});

app.get('/channel/:id', function(req, res) {
	var channel = channels[req.params.id];
	if (channel)
		res.json(channel);
	else
		res.json(404, {error: 'Channel not found'});
});

app.post('/channel/:id', function(req, res) {
	var channel = channels[req.params.id],
		occupant = req.body.occupant;
	if (channel) {
		channel.occupants.push(occupant);
		res.json({status: 'success'});
	} else {
		res.json(404, {error: 'Channel not found'});
	}
});

app.delete('/channel/:id', function(req, res) {
	var channel = channels[req.params.id],
		occupant = req.body.occupant,
		isInChannel = function(channelOccupant) {
			return occupant.id === channelOccupant.id;
		},
		isNotInChannel = function() { return !isInChannel(this, arguments); };

	if (!channel)
		return res.json(404, {error: 'Channel does not exist'});

	if (!occupant || !occupant.id)
		return res.json(403, {error: 'Invalid occupant'});

	if (!channel.occupants.some(isInChannel))
		return res.json({status: 'User was already gone'});

	channel.occupants = channel.occupants.filter(isNotInChannel);
	res.json({status: 'User kicked out'});
});

app.listen(3000);
console.log('Listening on port 3000');
