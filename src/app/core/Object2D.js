define(function (require) {

	'use strict';

	var Backbone = require('backbone');

	var Vector2 = require('math/Vector2');
	var MathUtil = require('math/MathUtil');

	var Object2D = Backbone.View.extend({
		initialize: function () {
			this.id = 'component-' + MathUtil.generateUUID(8);
			this.tagName = 'section';
			this.name = '';
			this.localUpdate = false;
			this.worldUpdate = false;

			var rotation = 0;
			var worldRotation = 0;
			// ensures position and scale cannot be overridden, use copy instead
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
						this.localUpdateCallback(this.updateWorldRotation)();
					},
					get: function () {
						return rotation;
					}
				},
				worldPosition: {
					enumerable: true,
					value: new Vector2(0, 0)
				},
				worldScale: {
					enumerable: true,
					value: new Vector2(1, 1)
				},
				worldRotation: {
					enumerable: true,
					set: function (value) {
						worldRotation = value;
						this.worldUpdateCallback(this.updateLocalRotation)();
					},
					get: function () {
						return worldRotation;
					}
				}
			});

			$(this.position).on('change', this.localUpdateCallback(this.updateWorldPosition));
			$(this.scale).on('change', this.localUpdateCallback(this.updateWorldScale));

			$(this.worldPosition).on('change', this.worldUpdateCallback(this.updateLocalPosition));
			$(this.worldScale).on('change', this.worldUpdateCallback(this.updateLocalScale));

			this.parent = null;
			this.children = [];
		},


		localUpdateCallback: function (callback) {
			return function () {
				this.localUpdate = true;
				callback.apply(this, arguments);
				this.trigger('change');
				this.localUpdate = false;
			}.bind(this);
		},

		worldUpdateCallback: function (callback) {
			return function () {
				this.worldUpdate = true;
				callback.apply(this, arguments);
				this.trigger('change');
				this.worldUpdate = false;
			}.bind(this);
		},

		updateLocal: function () {
			this.updateLocalPosition();
			this.updateLocalRotation();
			this.updateLocalScale();
		},

		updateLocalPosition: function () {
			if (!this.localUpdate) {
				var parent = this.parent;
				if (parent) {
					var ca = Math.cos(-parent.worldRotation);
					var sa = Math.sin(-parent.worldRotation);
					var tx = this.worldPosition.x - parent.worldPosition.x;
					var ty = this.worldPosition.y - parent.worldPosition.y;
					var sx = parent.worldScale.x;
					var sy = parent.worldScale.y;
					this.position.set((ca * tx - sa * ty) / sx, (sa * tx + ca * ty) / sy);
				} else {
					this.position.copy(this.worldPosition);
				}
				this.children.forEach(function (child) {
					child.updateWorldPosition();
				}, this);
			}
		},

		updateLocalRotation: function () {
			if (!this.localUpdate) {
				if (this.parent) {
					this.rotation = this.worldRotation - this.parent.worldRotation;
				} else {
					this.rotation = this.worldRotation;
				}
				this.children.forEach(function (child) {
					child.updateWorldRotation();
				}, this);
			}
		},
		updateLocalScale: function () {
			if (!this.localUpdate) {
				if (this.parent) {
					this.scale.divideVectors(this.worldScale, this.parent.worldScale);
				} else {
					this.scale.copy(this.worldScale);
				}
				this.children.forEach(function (child) {
					child.updateWorldScale();
				}, this);
			}
		},

		updateWorld: function () {
			this.updateWorldPosition();
			this.updateWorldRotation();
			this.updateWorldScale();
		},

		updateWorldPosition: function () {
			if (!this.worldUpdate) {
				var parent = this.parent;
				if (parent) {
					var ca = Math.cos(parent.worldRotation);
					var sa = Math.sin(parent.worldRotation);
					var tx = this.position.x;
					var ty = this.position.y;
					var sx = parent.scale.x;
					var sy = parent.scale.y;
					this.worldPosition.set(sx * (ca * tx - sa * ty) + parent.worldPosition.x, sy * (sa * tx + ca * ty) + parent.worldPosition.y);
				} else {
					this.worldPosition.copy(this.position);
				}
				this.children.forEach(function (child) {
					child.updateWorldPosition();
				}, this);
			}
		},

		updateWorldRotation: function () {
			if (!this.worldUpdate) {
				if (this.parent) {
					this.worldRotation = this.rotation + this.parent.worldRotation;
				} else {
					this.worldRotation = this.rotation;
				}
				this.children.forEach(function (child) {
					child.updateWorldRotation();
				}, this);
			}
		},

		updateWorldScale: function () {
			if (!this.worldUpdate) {
				if (this.parent) {
					this.worldScale.multiplyVectors(this.scale, this.parent.worldScale);
				} else {
					this.worldScale.copy(this.scale);
				}
				this.children.forEach(function (child) {
					child.updateWorldRotation();
				}, this);
			}
		},

		translateOnRotation: function (value, rotation) {
			var localRotation = this.parent.worldRotation - rotation;
			this.position.set(
				this.position.x + value * Math.cos(localRotation),
				this.position.y + value * Math.sin(localRotation)
			);
		},

		translateOnAxis: function (value, axis) {
			this.translateOnRotation(value, Math.atan2(axis.y, axis.x));
		},

		translate: function (translation) {
			this.translateOnAxis(translation.length(), translation);
		},

		/**
		 * Translates object in screen space, i.e. horizontally relative to the page.
		 * Positive: right
		 * Negative: left
		 *
		 * @param value The amount to translate
		 */
		translateX: function (value) {
			this.translateOnRotation(value, 0);
		},

		/**
		 * Translates object in screen space, i.e. vertically relative to the page.
		 * Positive: Up
		 * Negative: Down
		 *
		 * @param value The amount to translate
		 */
		translateY: function (value) {
			this.translateOnRotation(value, Math.TAU / 4);
		},

		add: function (child) {
			if (!(child instanceof Object2D)) {
				throw new Error('Object2D: Cannot add child which is not of type Object2D');
			}
			child.parent = this;
			child.updateWorld();
			this.children.push(child);
		},

		moveToPosition: function () {
			// TODO: currently scene requries this to exist
		}
	});

	return Object2D;

});

