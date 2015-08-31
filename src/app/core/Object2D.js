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
			this.needsUpdate = true;
			this.needsWorldUpdate = true;

			var rotation = 0;
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
						this.onChange(value);
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
				}
			});

			$(this.position).on('change', this.onChange.bind(this));
			$(this.scale).on('change', this.onChange.bind(this));

			this.parent = null;
			this.children = [];

			window.obj = this;
		},

		onChange: function () {
			this.needsUpdate = true;
			this.updateWorld(true);
			this.trigger('change');
		},

		updateWorld: function (force) {
			if (this.needsWorldUpdate || force) {
				var parent = this.parent;
				if (parent) {
					parent.updateWorld(force);
					var ca = Math.cos(parent.worldRotation);
					var sa = Math.sin(parent.worldRotation);
					var tx = this.position.x;
					var ty = this.position.y;
					var sx = parent.scale.x;
					var sy = parent.scale.y;
					this.worldPosition.set(sx * (ca * tx - sa * ty) + parent.worldPosition.x, sy * (sa * tx + ca * ty) + parent.worldPosition.y);
					this.worldRotation = this.rotation + parent.worldRotation;
					this.worldScale.multiplyVectors(this.scale, parent.worldScale);
				} else {
					this.worldPosition.copy(this.position);
					this.worldRotation = this.rotation;
					this.worldScale.copy(this.scale);
				}
				this.needsWorldUpdate = false;
			}
		},

		translateOnRotation: function (value, rotation) {
			this.parent.updateWorld();
			var localRotation = this.parent.worldRotation - rotation;
			this.position.set(
				this.position.x + value * Math.cos(localRotation),
				this.position.y + value * Math.sin(localRotation)
			);
		},

		translateOnAxis: function (value, axis) {
			this.translateOnRotation(value, Math.atan2(axis.y, axis.x));
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
			this.children.push(child);
		},

		moveToPosition: function () {
			// TODO: currently scene requries this to exist
		}
	});

	return Object2D;

});

