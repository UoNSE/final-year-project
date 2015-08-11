define(function (require) {

	'use strict';

	require('jquery.transform2d');
	require('jquery.transform3d');
	require('jquery-ui');

	function Animate () {}

	Animate._animate = function (element, options) {
		element
			.css(options.css)
			.delay(options.delay || 0)
			.animate(options.animate, {
				duration: options.duration || 1500,
				easing: options.easing || 'easeOutElastic',
				complete: options.complete || function () {}
			}
		);
	};

	Animate.scaleOut = function (element, options) {
		// Define the options if they do not exist.
		options = options || {};
		// Add the CSS options.
		options.css = options.css || {};
		options.css['transform'] = 'scale(0)';
		// Define the animate options.
		options.animate = options.animate || {};
		Animate._animate(element, options);
	};

	/**
	 * TODO
	 *
	 * @param element
	 * @param [options]
	 */
	Animate.scale = function (element, options) {
		// Define the options if they do not exist.
		options = options || {};
		// Add the CSS options.
		options.css = options.css || {};
		options.css['transform'] = 'scale(0)';
		// Add the animate options.
		options.animate = options.animate || {};
		options.animate['transform'] = 'scale(1)';
		Animate._animate(element, options);
	};

	return Animate;

});
