define(function (require) {

	'use strict';

	var ViewController = require('controller/ViewController');

	return ViewController.extend({

		buttonColor: null,
		buttonHoverColor: null,

		initialize: function () {

			ViewController.prototype.initialize.apply(this, arguments);

			this.buttonColour = 'btn-material-yellow';
			this.buttonHoverColour = 'btn-material-orange';

		}

	});

});
