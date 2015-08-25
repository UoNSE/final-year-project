define(function (require) {

	'use strict';

	var ViewController = require('controller/ViewController');

	return ViewController.extend({

		selector: '#back',

		events: {
			'click #back': '_onBack'
		},

		onReady: function () {
			$(this.selector).hide();
		},

		_onBack: function () {
			this.trigger('back');
		}

	});

});
