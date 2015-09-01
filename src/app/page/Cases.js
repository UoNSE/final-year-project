define(function (require) {
	'use strict';

	var Object2D = require('core/Object2D');
	var Cases = require('component/cases/Cases');

	return Object2D.extend({
		name: 'cases',
		initialize: function () {
			Object2D.prototype.initialize.call(this);

			this.add(new Cases());
		}
	});
});

