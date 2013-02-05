define([
	'jQuery', 'Underscore', 'Backbone', 'app'
], function (
	$, _, Backbone, app
) {
	return Backbone.Router.extend({

		routes: {
			'': 'landing',
			'?*query': 'landing',
			'*channel': 'channel'
		},

		landing: function (path) {
			// Show welcome page
		},

		vidgrid: function (path) {
			// Render placeholder
			// Call API to fetch channel meta data
			// -> Show channel
			// -> Show 404
		}

	});
});
