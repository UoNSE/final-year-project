define(function (require) {

	'use strict';

	var Component = require('core/Component');
	var template = require('text!component/actionbutton/ActionButton.hbs');

	var ActionButton = require('model/ActionButton');

	var TWEEN = require('tweenjs');

	return Component.extend({

		template: template,

		events: {
			'click .btn-start': 'onStart'
		},

		initialize: function () {
			Component.prototype.initialize.apply(this, arguments);
			this.model = new ActionButton({
				text: 'Touch to Start',
				color: 'danger',
				href: 'cases',
				styles: {
					width: 200,
					height: 200
				}
			});
		},

		onStart: function (event) {
			new TWEEN.Tween(this).to({
				rotation: this.rotation + Math.TAU
			}, 2000).repeat(Infinity).start();
		}

	});

});
