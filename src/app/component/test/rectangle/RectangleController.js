define(function (require) {
	'use strict';

	var Object2D = require('Object2D');

	return Object2D.extend({

		attributes: {
			'class': 'rectangle'
		},

		initialize: function () {
			Object2D.prototype.initialize.call(this);

			this.name = 'Rectangle';
		},

		render: function () {
			this.$el.html('<h3>Rectangle</h3>');
			return this;
		}

	});
});
