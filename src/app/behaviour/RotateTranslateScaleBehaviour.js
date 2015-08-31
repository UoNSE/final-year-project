define(function (require) {

	'use strict';

	var Vector2 = require('math/Vector2');

	function RotateTranslateScaleBehaviour (component) {

		this.component = component;
		this.touches = {};
		this.flipY = new Vector2(1, -1);

	}

	RotateTranslateScaleBehaviour.prototype.pageToWorld = function (vector) {
		var client = new Vector2(window.innerWidth, window.innerHeight);
		return new Vector2().subVectors(vector, client.divideScalar(2)).multiply(this.flipY);
	};

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
			var point = this.pageToWorld(new Vector2(touch.pageX, touch.pageY));
			this.component.component.worldPosition.copy(point);
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
