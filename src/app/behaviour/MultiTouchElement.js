define(function (require) {
	'use strict';

	var $ = require('jquery');

	function MultiTouchElement (component) {
		this.component = component;
		this.element = component.$el;
		this.behaviours = [];
		this.bindEvents();
	}

	MultiTouchElement.prototype.bindEvents = function () {
		this.element.on({
			mousedown: this.onMouseDown.bind(this),
			touchstart: this.onTouchStart.bind(this),
			remove: this.onRemove.bind(this)
		});
	};

	MultiTouchElement.prototype.unbindEvents = function () {
		this.element.off();
	};

	MultiTouchElement.prototype.dispatchEvent = function (eventCallbackName, event) {
		for (var i = 0, len = this.behaviours.length; i < len; i++) {
			if (this.behaviours[i][eventCallbackName]) {
				this.behaviours[i][eventCallbackName](this.element, event);
			}
		}
	};

	MultiTouchElement.prototype.onMouseDown = function (event) {
		this.dispatchEvent('onMouseDown', event);

		// Attach events to the window.
		// This improves robustness when the cursor leaves the window or element during drag.
		// Also only listen for the touchmove event when dragging (after touchstart).
		// Unbind after drag (touchend).
		var $window = $(window);
		var onMouseMove = this.onMouseMove.bind(this);
		$window.on('mousemove', onMouseMove);
		$window.one('mouseup', function () {
			$window.off('mousemove', onMouseMove);
			this.onMouseUp.apply(this, arguments);
		}.bind(this));
	};

	MultiTouchElement.prototype.onMouseMove = function (event) {
		this.dispatchEvent('onMouseMove', event);
	};

	MultiTouchElement.prototype.onMouseUp = function (event) {
		this.dispatchEvent('onMouseUp', event);
	};

	MultiTouchElement.prototype.onTouchStart = function (event) {
		event.preventDefault();
		this.dispatchEvent('onTouchStart', event);

		var $window = $(window);
		var onTouchMove = this.onTouchMove.bind(this);
		$window.on('touchmove', onTouchMove);
		$window.one('touchend', function () {
			$window.off('touchmove', onTouchMove);
			this.onTouchEnd.apply(this, arguments);
		}.bind(this));
	};

	MultiTouchElement.prototype.onTouchMove = function (event) {
		event.preventDefault();
		this.dispatchEvent('onTouchMove', event);
	};

	MultiTouchElement.prototype.onTouchEnd = function (event) {
		event.preventDefault();
		this.dispatchEvent('onTouchEnd', event);
	};

	MultiTouchElement.prototype.onRemove = function () {
		$(this).trigger('remove');
	};

	MultiTouchElement.prototype.addBehaviour = function (behaviour) {
		this.behaviours.push(behaviour);
	};

	return MultiTouchElement;

});
