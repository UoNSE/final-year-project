define(function (require) {

	'use strict';

	var ViewController = require('controller/ViewController');

	return ViewController.extend({

		selector: '#back',

		events: {
			'click #back': '_onBack'
		},

		_onBack: function () {
			this.trigger('back');
		}

	});

});
