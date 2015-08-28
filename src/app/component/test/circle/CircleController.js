define(function (require) {
	'use strict';

	var Object2D = require('Object2D');

	return Object2D.extend({

		attributes: {
			'class': 'circle'
		},

		initialize: function () {
			Object2D.prototype.initialize.call(this);

			this.name = 'Circle';
		},

		render: function () {
			this.$el.html('<h3>Circle</h3>');
			return this;
		}

	});
});