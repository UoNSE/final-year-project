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

			this.on('change', this.moveToPosition.bind(this));
		},

		moveToPosition: function () {
			this.$el.css({
				'transform': 'translate(calc(-50% + ' + this.position.x + 'px), calc(-50% + ' + this.position.y + 'px))'
				+ ' rotateZ(' + (-this.rotation / Math.TAU) + 'turn)'
				+ ' scale(' + this.scale.x + ', ' + this.scale.y + ')'
			});
		},

		onSetInteractive: function (enabled) {
			if (enabled) {
				this.multiTouchElement = multiTouchManager.addElementRTS(this.$el);
			} else {
				multiTouchManager.remove(this.multiTouchElement);
			}
		}
	});
});

