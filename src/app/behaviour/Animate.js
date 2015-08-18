define(function (require) {

	'use strict';

	require('jquery.transform2d');
	require('jquery.transform3d');
	require('jquery-ui');
    var Factory = require('Factory');

	function Animate () {
		this.numRunning = 0;
		this.finishedCallbacks = []
	}

	Animate.prototype.onFinished = function (callback) {
		if (this.numRunning > 0) {
			this.finishedCallbacks.push(callback);
		} else {
			callback();
		}
	};

	Animate.prototype.reset = function () {
		this.finishedCallbacks.length = 0;
		this.numRunning = 0;
	};

	Animate.prototype._animate = function (element, options) {
		this.numRunning++;
		element
			.css(options.css)
			.delay(options.delay || 0)
			.animate(options.animate, {
				duration: options.duration || 1500,
				easing: options.easing || 'easeOutElastic',
				complete: options.complete || function () {},
				always: function () {
					this.numRunning = Math.max(0, this.numRunning - 1);
					if (this.numRunning === 0) {
						this.finishedCallbacks.forEach(function (callback) {
							callback();
						});
						this.finishedCallbacks.length = 0;
					}
				}.bind(this)
			}
		);
	};

	Animate.prototype.scaleIn = function (element, options) {
		// Define the options if they do not exist.
		options = options || {};
		// Add the CSS options.
		options.css = options.css || {};
		// Define the animate options.
		options.animate = options.animate || {
			transform: 'scale(1)'
		};
		this._animate(element, options);
	};

	Animate.prototype.scaleOut = function (element, options) {
		// Define the options if they do not exist.
		options = options || {};
		// Add the CSS options.
		options.css = options.css || {};
		// Define the animate options.
		options.animate = options.animate || {
			transform: 'scale(0)'
		};
		this._animate(element, options);
	};

	/**
	 * TODO
	 *
	 * @param element
	 * @param [options]
	 */
	Animate.prototype.scale = function (element, options) {
		// Define the options if they do not exist.
		options = options || {};
		// Add the CSS options.
		options.css = options.css || {};
		options.css['transform'] = 'scale(0)';
		// Add the animate options.
		options.animate = options.animate || {};
		options.animate['transform'] = 'scale(1)';
		this._animate(element, options);
	};

	return Factory.createFactory(Animate);

});
