define(function (require) {
	'use strict';

	var Object2D = require('core/Object2D');

	return Object2D.extend({
		initialize: function (camera, urlParams) {
			Object2D.prototype.initialize.apply(this, arguments);

			this.camera = camera;
			this.urlParams = urlParams;
		}
	});
});
