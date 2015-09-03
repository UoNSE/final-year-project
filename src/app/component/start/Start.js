define(function (require) {

	'use strict';

	var Component = require('core/Component');
	var template = require('text!component/start/Start.hbs');
	var TWEEN = require('tweenjs');

	return Component.extend({

		template: template,
		styles: ['component/start/Start.css'],

		events: {
			'click .btn-start': 'onStart'
		},

		model: {
			text: 'Touch to\nStart'
		},

		//initialize: function () {
		//	Component.prototype.initialize.apply(this, arguments);
		//},

		onStart: function (event) {
			new TWEEN.Tween(this).to({
				rotation: this.rotation + Math.TAU
			}, 2000).repeat(Infinity).start();
		}

	});

});
