define(function (require) {
	'use strict';

	var Object2D = require('core/Object2D');
	var Start = require('component/start/Start');

	return Object2D.extend({
		name: 'start',
		initialize: function () {
			Object2D.prototype.initialize.call(this);

			this.add(new Start());
		}
	});
});

