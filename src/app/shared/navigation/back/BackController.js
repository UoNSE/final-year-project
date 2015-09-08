define(function (require) {

	'use strict';

	var ViewController = require('controller/ViewController');

	var template = require('text!shared/navigation/back/BackView.html');

	return ViewController.extend({

		template: template,
		selector: '#back',

		events: {
			'click #back': 'onBack'
		},

		initialize: function () {
			ViewController.prototype.initialize.apply(this, arguments);
			this.render();
		},

		onReady: function () {
			$(this.selector).hide();
		},

		onBack: function () {
			this.trigger('back');
		}

	});

});
