define(function (require) {

	'use strict';

	var $ = require('jquery');

	var ViewController = require('controller/ViewController');
	var animate = require('behaviour/Animate').getInstance();

	return ViewController.extend({

		displayBack: false,

		events: {
			'click #btn-start': '_onStart'
		},

		_onStart: function (event) {
			var button = $(event.target).addClass('disabled');
			animate.scaleOut(button, {
				css: {opacity: 0},
				duration: 600,
				easing: 'easeInBack'
			});
		}

	});

});
