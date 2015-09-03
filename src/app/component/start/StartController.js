define(function (require) {

	'use strict';

	var $ = require('jquery');

	var ViewController = require('controller/ViewController');
	var template = require('text!component/start/StartView.html');

	var Animate = require('behaviour/Animate').getInstance();

	return ViewController.extend({

		displayBack: false,
		template: template,

		events: {
			'click #btn-start': 'onStart'
		},

		initialize: function () {
			ViewController.prototype.initialize.apply(this, arguments);
			this.render();
		},

		onStart: function (event) {
			var button = $(event.target).addClass('disabled');
			Animate.scaleOut(button, {
				duration: 600,
				easing: 'easeInBack'
			});
		}

	});

});
