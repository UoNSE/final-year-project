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
			var draggable = false;
			var droppable = false;
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
				},
				draggable: {
					enumerable: true,
					get: function () {
						return draggable;
					},
					set: function (value) {
						if (draggable != value) {
							draggable = value;
							this.onSetDraggable(value);
						}
					}
				},
				droppable: {
					enumerable: true,
					get: function () {
						return droppable;
					},
					set: function (value) {
						if (droppable != value) {
							droppable = value;
							this.onSetDroppable(value);
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

		onSetDraggable: function (enabled) {
			// TODO: handle remove
			multiTouchManager.makeDraggable(this.getMultiTouchElement());
		},

		onSetDroppable: function (enabled) {
			// TODO: handle remove
			multiTouchManager.makeDroppable(this.getMultiTouchElement());
		}
	});
});

