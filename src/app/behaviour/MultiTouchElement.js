define(function (require) {

	'use strict';

	var $ = require('jquery');

	function MultiTouchElement (element) {

		this.element = $(element);
		this.behaviours = [];
		this.bindEvents();

	}

	MultiTouchElement.prototype.bindEvents = function () {

		this.element.on('mousedown', this.onMouseDown.bind(this));
		this.element.on('mousemove', this.onMouseMove.bind(this));
		this.element.on('mouseup', this.onMouseUp.bind(this));
		this.element.on('touchstart', this.onTouchStart.bind(this));
		this.element.on('touchmove', this.onTouchMove.bind(this));
		this.element.on('touchend', this.onTouchEnd.bind(this));

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

	};

	MultiTouchElement.prototype.onTouchMove = function (event) {

		event.preventDefault();

		this.dispatchEvent('onTouchMove', event);

	};
	MultiTouchElement.prototype.onTouchEnd = function (event) {

		event.preventDefault();

		this.dispatchEvent('onTouchEnd', event);

	};

	MultiTouchElement.prototype.addBehaviour = function (behaviour) {

		this.behaviours.push(behaviour);

	};

	return MultiTouchElement;

});
