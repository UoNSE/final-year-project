define(function (require) {

	'use strict';

	function RotateTranslateScaleBehaviour () {

		this.element = null;
		this.touchOffset = {x: 0, y: 0};

	}

	RotateTranslateScaleBehaviour.prototype.onTouchStart = function (event) {

		var touch = event.originalEvent.touches[0];
		var elementOffset = this.element.offset();
		this.touchOffset.x = touch.pageX - elementOffset.left;
		this.touchOffset.y = touch.pageY - elementOffset.top;

	};

	RotateTranslateScaleBehaviour.prototype.onTouchMove = function (event) {

		var touch = event.originalEvent.touches[0];
		this.element.offset({
			left: touch.pageX - this.touchOffset.x,
			top: touch.pageY - this.touchOffset.y
		});

	};

	return RotateTranslateScaleBehaviour;

});
