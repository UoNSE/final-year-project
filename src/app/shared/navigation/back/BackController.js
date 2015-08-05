define(function (require) {

	'use strict';

	var Controller = require('controller/Controller');

	return Controller.extend({

		selector: '#back',

		events: {
			'click #back': '_onBack'
		},

		_onBack: function () {
			this.trigger('back');
		}

	});

});
