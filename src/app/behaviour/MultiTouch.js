define(['jquery', 'Factory'], function ($, Factory) {

	'use strict';

	function MultiTouch() {

		$(document.body).on('touchmove', function (event) {

			event.preventDefault();

		});

	}

	MultiTouch.prototype.addItem = function (element) {

		var $element = $(element);
		var touchOffset = {x: 0, y: 0};

		$element.on('touchstart', function (event) {

			event.preventDefault();

			var elementOffset = $element.offset();
			var touch = event.originalEvent.touches[0] || event.originalEvent.changedTouches[0]; // TODO: support multitouch
			touchOffset.x = touch.pageX - elementOffset.left;
			touchOffset.y = touch.pageY - elementOffset.top;

		});

		$element.on('touchmove', function (event) {

			event.preventDefault();

			var touch = event.originalEvent.touches[0] || event.originalEvent.changedTouches[0]; // TODO: support multitouch
			$element.offset({
				left: touch.pageX - touchOffset.x,
				top: touch.pageY - touchOffset.y
			});

		});

	};

	return Factory.createFactory(MultiTouch);

});

