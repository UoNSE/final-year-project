define(function (require) {

	'use strict';

	var $ = require('jquery');

	var ViewController = require('controller/ViewController');
	var animate = require('behaviour/Animate').getInstance();

	return ViewController.extend({

		displayBack: false,

		events: {
			'click #btn-start': 'onStart'
		},

		onBeforeRender: function () {
			//this.addChildView('#mychild', 'component/cases/Cases');
		},

		onStart: function (event) {
			console.log('click');
			var button = $(event.target).addClass('disabled');
			animate.scaleOut(button, {
				duration: 600,
				easing: 'easeInBack'
			});
		}

	});

});
