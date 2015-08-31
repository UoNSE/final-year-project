define(function (require) {
	'use strict';

	var Vector2 = require('math/Vector2');
	var MathUtil = require('math/MathUtil');

	function RotateTranslateScaleBehaviour (component) {

		this.component = component;
		this.touches = {};

	}

	RotateTranslateScaleBehaviour.prototype.onTouchStart = function (component, event) {

		var changedTouches = event.originalEvent.changedTouches;
		changedTouches.forEach(function (touch) {
			this.touches[touch.identifier] = {
				startPoint: new Vector2(touch.pageX, touch.pageY),
				lastPoint: new Vector2(touch.pageX, touch.pageY)
			};
		}, this);

	};

	RotateTranslateScaleBehaviour.prototype.onTouchMove = function (element, event) {

		var targetTouches = event.originalEvent.targetTouches;
		var len = targetTouches.length;
		if (len === 1) {
			var touch = targetTouches[0];
			//var touchInfo = this.touches[touch.identifier];
			var point = MathUtil.pageToWorld(new Vector2(touch.pageX, touch.pageY));
			this.component.component.worldPosition.copy(point);
			this.component.component.needsWorldUpdate = false;
		}
	};

	RotateTranslateScaleBehaviour.prototype.onTouchEnd = function (component, event) {

		var changedTouches = event.originalEvent.changedTouches;
		changedTouches.forEach(function (touch) {
			delete this.touches[touch.identifier];
		}, this);

	};

	return RotateTranslateScaleBehaviour;

});
