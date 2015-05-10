define(function (require) {

	'use strict';

	function RotateTranslateScaleBehaviour () {

		this.touchOffset = {x: 0, y: 0};

	}

	RotateTranslateScaleBehaviour.prototype.onTouchStart = function (element, event) {

		var touch = event.originalEvent.touches[0];
		var elementOffset = element.offset();
		this.touchOffset.x = touch.pageX - elementOffset.left;
		this.touchOffset.y = touch.pageY - elementOffset.top;

	};

	RotateTranslateScaleBehaviour.prototype.onTouchMove = function (element, event) {

		var touch = event.originalEvent.touches[0];
		element.offset({
			left: touch.pageX - this.touchOffset.x,
			top: touch.pageY - this.touchOffset.y
		});

	};

	return RotateTranslateScaleBehaviour;

});
