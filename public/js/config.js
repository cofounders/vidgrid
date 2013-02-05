require.config({

	baseUrl: '/js',

	deps: ['main'],

	paths: {
		Backbone: '//cdnjs.cloudflare.com/ajax/libs/backbone.js/0.9.10/backbone-min',
		jQuery: '//cdnjs.cloudflare.com/ajax/libs/jquery/1.9.0/jquery.min',
		Mustache: '//cdnjs.cloudflare.com/ajax/libs/mustache.js/0.7.0/mustache.min',
		Underscore: '//cdnjs.cloudflare.com/ajax/libs/lodash.js/1.0.0-rc.3/lodash.min'
	},

	shim: {
		Backbone: {
			deps: ['Underscore', 'jQuery'],
			exports: 'Backbone'
		},
		jQuery: {
			exports: 'jQuery'
		},
		Mustache: {
			exports: 'Mustache'
		},
		Underscore: {
			exports: '_'
		}
	},

	waitSeconds: 20

});
