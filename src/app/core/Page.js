define(function (require) {
	'use strict';

	var Object2D = require('core/Object2D');

	return Object2D.extend({
		initialize: function (urlParams) {
			Object2D.prototype.initialize.call(this);

			this.urlParams = urlParams;
		}
	});
});
