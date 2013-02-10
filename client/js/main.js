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

				var pc_config = {
						iceServers: [
							{
								url: "stun:stun.l.google.com:19302"
							}
						]
					},
					pc_constraints = {
						optional: [
							{
								DtlsSrtpKeyAgreement: true
							}
						]
					},
					constraints = {
						optional: [],
						mandatory: {
							MozDontOfferDataChannel: true
						}
					},
					sdpConstraints = {
						mandatory: {
							OfferToReceiveAudio: true,
							OfferToReceiveVideo: true
						}
					};

					function mergeConstraints(cons1, cons2) {
						var merged = cons1;
						for (var name in cons2.mandatory) {
							merged.mandatory[name] = cons2.mandatory[name];
						}
						merged.optional.concat(cons2.optional);
						return merged;
					}

				var rtcpc = new webkitRTCPeerConnection(pc_config, pc_constraints);
				rtcpc.addStream(localMediaStream);

				rtcpc.createOffer(
					function(sessionDescription) {
						console.log('Created offer', sessionDescription);
						$.post('http://localhost:3000/channel', {
							occupant: {
								id: 'seb',
								sdp: sessionDescription
							}
						});
					},
					function() {
						console.log('ERROR: Cannot create offer', arguments);
					},
					mergeConstraints(constraints, sdpConstraints)
				);
			},
			function(err) {
				console.log("The following error occured: " + err);
			}
		);
	});

});
