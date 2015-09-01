define(function (require) {
	'use strict';

	var Object2D = require('core/Object2D');
	var multiTouchManager = require('behaviour/MultiTouchManager').getInstance();

	return Object2D.extend({
		tagName: 'section',
		attributes: {
			'class': 'component'
		},
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

		getMultiTouchElement: function () {
			if (!this.multiTouchElement) {
				this.multiTouchElement = multiTouchManager.addElement(this);
			}
			return this.multiTouchElement;
		},

		onSetInteractive: function (enabled) {
			// TODO: handle remove
			multiTouchManager.makeRTS(this.getMultiTouchElement());
		},

		setDraggable: function (options) {
			// TODO: handle remove
			multiTouchManager.makeDraggable(this.getMultiTouchElement(), options);
		},

		setDroppable: function (options) {
			// TODO: handle remove
			multiTouchManager.makeDroppable(this.getMultiTouchElement(), options);
		}
	});
});

