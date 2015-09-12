define(function (require) {
	'use strict';

	var Object2D = require('core/Object2D');
	var BackButton = require('component/backbutton/BackButton');
	var Promise = require('bluebird');
	var Vector2 = require('math/Vector2');

	return Object2D.extend({
		back: true,

		initialize: function (router, camera, urlParams) {
			Object2D.prototype.initialize.apply(this, arguments);

			this.camera = camera;
			this.urlParams = urlParams;
			if (this.back) {
				this.add(new BackButton(router));
			}

		},

		onPageEnter: function () {
			// Override in submodule.
			return Promise.resolve();
		},

		onPageLeave: function () {
			// Override in submodule.
			return new TWEEN.Tween(this.scale)
				.to(Vector2.zeros(), 500)
				.easing(TWEEN.Easing.Back.In)
				.start()
				.promise();
		}
	});
});
