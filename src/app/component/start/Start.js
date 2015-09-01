define(function (require) {

	'use strict';

	var Component = require('core/Component');
	var Handlebars = require('handlebars');
	var template = require('text!component/start/Start.html');

	return Component.extend({

		events: {
			'click #btn-start': 'onStart'
		},

		//initialize: function () {
		//	Component.prototype.initialize.apply(this, arguments);
		//},

		onStart: function (event) {
			new TWEEN.Tween(this).to({
				rotation: this.rotation + Math.TAU
			}, 2000).repeat(Infinity).start();
		},

		render: function () {
			this.$el.html(Handlebars.compile(template)({
				text: 'Touch to\nStart'
			}));
			return this;
		}

	});

});
