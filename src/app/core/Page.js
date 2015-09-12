define(function (require) {
	'use strict';

	var Object2D = require('core/Object2D');
	var BackButton = require('component/backbutton/BackButton');

	return Object2D.extend({
		back: true,
		initialize: function (router, camera, urlParams) {
			Object2D.prototype.initialize.apply(this, arguments);

			this.camera = camera;
			this.urlParams = urlParams;
			if (this.back) {
				this.add(new BackButton(router));
			}
		}
	});
});
