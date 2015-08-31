define(function (require) {

	'use strict';

	var Vector2 = require('math/Vector2');

	function Transform () {

		var rotation = 0;

		Object.defineProperties(this, {
			position: {
				enumerable: true,
				value: new Vector2(0, 0)
			},
			scale: {
				enumerable: true,
				value: new Vector2(1, 1)
			},
			rotation: {
				enumerable: true,
				set: function (value) {
					rotation = value;
				},
				get: function () {
					return rotation;
				}
			}
		});
	}

	Transform.prototype.applyInverseTransform = function (transform) {
		var ca = Math.cos(-transform.rotation);
		var sa = Math.sin(-transform.rotation);
		var tx = this.position.x - transform.position.x;
		var ty = this.position.y - transform.position.y;
		var sx = transform.scale.x;
		var sy = transform.scale.y;
		this.position.set((ca * tx - sa * ty) / sx, (sa * tx + ca * ty) / sy);
		this.rotation -= transform.rotation;
		this.scale.divideVectors(this.scale, transform.scale);

		return this;
	};

	Transform.prototype.applyTransform = function (transform) {
		var ca = Math.cos(transform.rotation);
		var sa = Math.sin(transform.rotation);
		var tx = this.position.x;
		var ty = this.position.y;
		var sx = transform.scale.x;
		var sy = transform.scale.y;
		this.position.set(sx * (ca * tx - sa * ty) + transform.position.x, sy * (sa * tx + ca * ty) + transform.position.y);
		this.rotation += transform.rotation;
		this.scale.multiplyVectors(this.scale, transform.scale);

		return this;
	};

	Transform.prototype.getInverse = function () {
		var inverse = this.clone();
		inverse.position.negate();
		inverse.scale.reciprocal();
		inverse.rotation *= -1;

		return inverse;
	};

	Transform.prototype.copy = function (transform) {
		this.position.copy(transform.position);
		this.scale.copy(transform.scale);
		this.rotation = transform.rotation;

		return this;
	};

	Transform.prototype.clone = function () {
		var transform = new Transform();
		transform.position.copy(this.position);
		transform.scale.copy(this.scale);
		transform.rotation = this.rotation;

		return transform;
	};

	return Transform;
});

