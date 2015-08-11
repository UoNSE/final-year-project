define(function (require) {

	'use strict';

	var $ = require('jquery');

	var ViewController = require('controller/ViewController');
	var Animate = require('behaviour/Animate');

	return ViewController.extend({

		displayBack: false,

		events: {
			'click #btn-start': 'onStart'
		},

		onStart: function (event) {
			var button = $(event.target).addClass('disabled');
			Animate.scaleOut(button, {
				css: {opacity: 0},
				duration: 600,
				easing: 'easeInBack'
			});
		}

	});

});
