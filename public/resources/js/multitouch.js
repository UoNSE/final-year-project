define(['jquery'], function ($) {
	'use strict';

	jQuery(window).on('touchmove', function () {
		// prevent browser default touch events
		event.preventDefault();
	});

	return {
		addItem: function (item) {
			var $item = $(item);
			$item.on('touchstart', function (event) {
				// TODO
			});
			$item.on('touchmove', function () {
				event.preventDefault();
				var touches = event.targetTouches;
				var touch = touches[0]; // TODO: support multi-touch
				touch.target.style.position = 'absolute';
				$item.offset({
					left: touch.pageX,
					top: touch.pageY
				});
			});
			$item.on('touchend', function () {
				// TODO
			});
		}
	};
});
