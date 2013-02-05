define([
	'jQuery',
	'Underscore',
	'Mustache',
	'Backbone'
], function ($, _, Mustache, Backbone) {

	var app = _.extend({
		el: $('body'),
		root: '/',
		// api: '/api/'
	}, Backbone.Events);

	return app;
});
