define(function (require) {
	'use strict';

	var $ = require('jquery');

	// All credit to three.js, this is just wrapped for AMD.
	// Source: https://raw.githubusercontent.com/mrdoob/three.js/master/src/math/Vector2.js
	// Docs: http://threejs.org/docs/#Reference/Math/Vector2

	function Vector2 (x, y) {
		this.__x = x || 0;
		this.__y = y || 0;
		Object.defineProperties(this, {
			x: {
				enumerable: true,
				get: function () {
					return this.__x;
				},
				set: function (value) {
					this.__x = value;
					this.onChange();
				}
			},
			y: {
				enumerable: true,
				get: function () {
					return this.__y;
				},
				set: function (value) {
					this.__y = value;
					this.onChange();
				}
			}
		});
	}

	Vector2.prototype = {

		constructor: Vector2,

		onChange: function () {
			$(this).trigger('change');
		},

		set: function (x, y) {

			this.__x = x;
			this.__y = y;
			this.onChange();

			return this;

		},

		setPolar: function (r, theta) {
			this.__x = r * Math.cos(theta);
			this.__y = r * Math.sin(theta);
			this.onChange();

			return this;
		},

		rotateZ: function (theta) {
			var ca = Math.cos(theta);
			var sa = Math.sin(theta);
			this.set(
				ca * this.__x - sa * this.__y,
				sa * this.__x + ca * this.__y
			);
			this.onChange();

			return this;
		},

		setX: function (x) {

			this.__x = x;
			this.onChange();

			return this;

		},

		setY: function (y) {

			this.__y = y;
			this.onChange();

			return this;

		},

		setComponent: function (index, value) {

			switch (index) {

				case 0:
					this.__x = value;
					this.onChange();
					break;
				case 1:
					this.__y = value;
					this.onChange();
					break;
				default:
					throw new Error('index is out of range: ' + index);

			}

		},

		getComponent: function (index) {

			switch (index) {

				case 0:
					return this.__x;
					this.onChange();
				case 1:
					return this.__y;
					this.onChange();
				default:
					throw new Error('index is out of range: ' + index);

			}

		},

		copy: function (v) {

			this.__x = v.x;
			this.__y = v.y;
			this.onChange();

			return this;

		},

		add: function (v, w) {

			this.__x += v.x;
			this.__y += v.y;
			this.onChange();

			return this;

		},

		addScalar: function (s) {

			this.__x += s;
			this.__y += s;
			this.onChange();

			return this;

		},

		addVectors: function (a, b) {

			this.__x = a.x + b.x;
			this.__y = a.y + b.y;
			this.onChange();

			return this;

		},

		sub: function (v, w) {

			this.__x -= v.x;
			this.__y -= v.y;
			this.onChange();

			return this;

		},

		subScalar: function (s) {

			this.__x -= s;
			this.__y -= s;
			this.onChange();

			return this;

		},

		subVectors: function (a, b) {

			this.__x = a.x - b.x;
			this.__y = a.y - b.y;
			this.onChange();

			return this;

		},

		multiply: function (v) {

			this.__x *= v.x;
			this.__y *= v.y;
			this.onChange();

			return this;

		},

		multiplyVectors: function (a, b) {

			this.__x = a.x * b.x;
			this.__y = a.y * b.y;
			this.onChange();

			return this;

		},

		multiplyScalar: function (s) {

			this.__x *= s;
			this.__y *= s;
			this.onChange();

			return this;

		},

		divide: function (v) {

			this.__x /= v.x;
			this.__y /= v.y;
			this.onChange();

			return this;

		},

		divideVectors: function (a, b) {

			this.__x = a.x / b.x;
			this.__y = a.y / b.y;
			this.onChange();

			return this;

		},

		divideScalar: function (scalar) {

			if (scalar !== 0) {

				var invScalar = 1 / scalar;

				this.__x *= invScalar;
				this.__y *= invScalar;

			} else {

				this.__x = 0;
				this.__y = 0;

			}
			this.onChange();

			return this;

		},

		min: function (v) {

			if (this.__x > v.x) {

				this.__x = v.x;

			}

			if (this.__y > v.y) {

				this.__y = v.y;

			}
			this.onChange();

			return this;

		},

		max: function (v) {

			if (this.__x < v.x) {

				this.__x = v.x;

			}

			if (this.__y < v.y) {

				this.__y = v.y;

			}
			this.onChange();

			return this;

		},

		clamp: function (min, max) {

			// This function assumes min < max, if this assumption isn't true it will not operate correctly

			if (this.__x < min.x) {

				this.__x = min.x;

			} else if (this.__x > max.x) {

				this.__x = max.x;

			}

			if (this.__y < min.y) {

				this.__y = min.y;

			} else if (this.__y > max.y) {

				this.__y = max.y;

			}
			this.onChange();

			return this;
		},

		clampScalar: (function () {

			var min, max;

			return function (minVal, maxVal) {

				if (min === undefined) {

					min = new Vector2();
					max = new Vector2();

				}

				min.set(minVal, minVal);
				max.set(maxVal, maxVal);

				return this.clamp(min, max);

			};

		})(),

		floor: function () {

			this.__x = Math.floor(this.x);
			this.__y = Math.floor(this.y);
			this.onChange();

			return this;

		},

		ceil: function () {

			this.__x = Math.ceil(this.x);
			this.__y = Math.ceil(this.y);
			this.onChange();

			return this;

		},

		round: function () {

			this.__x = Math.round(this.x);
			this.__y = Math.round(this.y);
			this.onChange();

			return this;

		},

		roundToZero: function () {

			this.__x = ( this.x < 0 ) ? Math.ceil(this.x) : Math.floor(this.x);
			this.__y = ( this.y < 0 ) ? Math.ceil(this.y) : Math.floor(this.y);
			this.onChange();

			return this;

		},

		negate: function () {

			this.__x = -this.x;
			this.__y = -this.y;
			this.onChange();

			return this;

		},

		dot: function (v) {

			return this.__x * v.x + this.__y * v.y;

		},

		lengthSq: function () {

			return this.__x * this.x + this.__y * this.y;

		},

		length: function () {

			return Math.sqrt(this.__x * this.x + this.__y * this.y);

		},

		normalize: function () {

			return this.divideScalar(this.length());

		},

		distanceTo: function (v) {

			return Math.sqrt(this.distanceToSquared(v));

		},

		distanceToSquared: function (v) {

			var dx = this.__x - v.x, dy = this.__y - v.y;
			return dx * dx + dy * dy;

		},

		setLength: function (l) {

			var oldLength = this.length();

			if (oldLength !== 0 && l !== oldLength) {

				this.multiplyScalar(l / oldLength);
			}

			return this;

		},

		lerp: function (v, alpha) {

			this.__x += ( v.x - this.x ) * alpha;
			this.__y += ( v.y - this.y ) * alpha;
			this.onChange();

			return this;

		},

		lerpVectors: function (v1, v2, alpha) {

			this.subVectors(v2, v1).multiplyScalar(alpha).add(v1);

			return this;

		},

		equals: function (v) {

			return ( ( v.x === this.__x ) && ( v.y === this.__y ) );

		},

		fromArray: function (array, offset) {

			if (offset === undefined) offset = 0;

			this.__x = array[offset];
			this.__y = array[offset + 1];
			this.onChange();

			return this;

		},

		toArray: function (array, offset) {

			if (array === undefined) array = [];
			if (offset === undefined) offset = 0;

			array[offset] = this.__x;
			array[offset + 1] = this.__y;

			return array;

		},

		clone: function () {

			return new Vector2(this.__x, this.__y);

		}

	};

	return Vector2;
});
