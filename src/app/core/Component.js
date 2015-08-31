define(function (require) {
	'use strict';

	var Object2D = require('core/Object2D');
	var multiTouchManager = require('behaviour/MultiTouchManager').getInstance();

	return Object2D.extend({
		tagName: 'section',
		multiTouchElement: null,

		initialize: function () {
			Object2D.prototype.initialize.apply(this, arguments);

			var interactive = false;
			Object.defineProperties(this, {
				interactive: {
					enumerable: true,
					get: function () {
						return interactive;
					},
					set: function (value) {
						if (interactive != value) {
							interactive = value;
							this.onSetInteractive(value);
						}
					}
				}
			});
		},

		onSetInteractive: function (enabled) {
			if (enabled) {
				this.multiTouchElement = multiTouchManager.addElementRTS(this);
			} else {
				multiTouchManager.remove(this);
			}
		}
	});
});

