define(function (require) {
	'use strict';

	var Vector2 = require('math/Vector2');
	var MathUtil = require('math/MathUtil');

	function RotateTranslateScaleBehaviour (multiTouchElement) {
		this.multiTouchElement = multiTouchElement;
		this.component = multiTouchElement.component;
		this.touches = {};
		this.lastMoveEvent = null;

		this.onMoveCallback = this.onMove.bind(this);
		this.onMoveId = null;
	}

	Object.assign(RotateTranslateScaleBehaviour.prototype, {
		onMouseMove: function (element, event) {
			var point = MathUtil.pageToWorld(new Vector2(event.pageX, event.pageY));
			this.component.worldPosition.copy(point);
			this.component.updateLocal(true);
		},

		onTouchStart: function (component, event) {
			var changedTouches = event.originalEvent.changedTouches;
			Array.from(changedTouches).forEach(function (touch) {
				this.component.updateWorld();
				var startPoint = MathUtil.pageToWorld(touch.pageX, touch.pageY).applyInverseTransform(this.component.worldTransform);
				this.touches[touch.identifier] = {
					startPoint: startPoint,
					lastPoint: new Vector2(touch.pageX, touch.pageY)
				};
			}, this);

			this.onMoveId = requestAnimationFrame(this.onMoveCallback);
		},

		onTouchMove: function (element, event) {
			this.lastMoveEvent = event;
		},

		onMove: function () {
			this.onMoveId = requestAnimationFrame(this.onMoveCallback);

			var event = this.lastMoveEvent;

			if (event === null) {
				return;
			}

			var targetTouches = event.originalEvent.targetTouches;
			var len = targetTouches.length;
			if (len === 1) {
				var touch = targetTouches[0];
				var touchInfo = this.touches[touch.identifier];
				var startPoint = touchInfo.startPoint;
				var touchWorld = MathUtil.pageToWorld(touch.pageX, touch.pageY);

				var transform = this.component.transform;
				var point = touchWorld.clone().sub(startPoint.clone().multiply(transform.scale).rotateZ(transform.rotation));

				this.component.worldPosition.copy(point);
				this.component.updateLocal(true);
			}
		},

		onTouchEnd: function (component, event) {
			var changedTouches = event.originalEvent.changedTouches;
			Array.from(changedTouches).forEach(function (touch) {
				delete this.touches[touch.identifier];
			}, this);

			this.lastMoveEvent = null;
			cancelAnimationFrame(this.onMoveId);
		}
	});

	return RotateTranslateScaleBehaviour;

});
