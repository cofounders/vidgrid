define(
[
	'jQuery',
	'app',
	'router'
],
function ($, app, Router) {

	app.router = new Router();

	Backbone.history.start({
		pushState: true,
		root: app.root
	});

	$(document).on('click', 'a:not([data-bypass])', function (event) {
		var href = $(this).prop('href');
		var root = location.href.substr(0, location.href.indexOf('/', 8)) + app.root;
		if (href && href.slice(0, root.length) === root) {
			event.preventDefault();
			Backbone.history.navigate(href.slice(root.length), true);
		}
	});

	$('button').click(function () {
		navigator.getMedia = (
			navigator.getMedia ||
			navigator.getUserMedia ||
			navigator.webkitGetUserMedia ||
			navigator.mozGetUserMedia ||
			navigator.msGetUserMedia
		);
		navigator.getMedia(
			{video: true, audio: true},
			function(localMediaStream) {
				var video = document.querySelector('video');
				video.src = window.URL.createObjectURL(localMediaStream);
				video.onloadedmetadata = function(event) {
					console.log("Got the video");
				};
				video.play();
			},
			function(err) {
				console.log("The following error occured: " + err);
			}
		);
	});

});
