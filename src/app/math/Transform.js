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

	Transform.prototype.applyTransform = function (transform) {
		this.position.rotateZ(transform.rotation).multiply(transform.scale).add(transform.position);
		this.rotation += transform.rotation;
		this.scale.multiplyVectors(this.scale, transform.scale);

		return this;
	};

	Transform.prototype.getInverse = function () {
		var inverse = this.clone();
		inverse.position.negate().divide(inverse.scale).rotateZ(-inverse.rotation);
		inverse.scale.reciprocal();
		inverse.rotation *= -1;

		return inverse;
	};

	Transform.prototype.localToWorld = function (reference) {
		return this.copy(reference.clone().applyTransform(this));
	};

	Transform.prototype.worldToLocal = function (reference) {
		return this.applyTransform(reference.getInverse());
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

