define(function (require) {
	'use strict';

	var Backbone = require('backbone');
	var Vector2 = require('math/Vector2');
	var Transform = require('math/Transform');
	var MathUtil = require('math/MathUtil');

	var Object2D = Backbone.View.extend({
		name: '',
		tagName: 'section',
		parent: null,
		visible: true,
		needsWorldUpdate: true,
		detached: false,
		opacity: 1,
		// Supports:
		// 'top left',    'top center',    'top right',
		// 'center left'  'center'         'center right',
		// 'bottom left', 'bottom center', 'bottom right'
		origin: 'center',
		// Same support as origin
		pageOrigin: 'center',

		initialize: function () {

			this.id = 'component-' + MathUtil.generateUUID(8);
			this.children = [];

			var transform = new Transform();
			var worldTransform = new Transform();
			// create proxies
			Object.defineProperties(this, {
				transform: {
					enumerable: true,
					value: transform
				},
				worldTransform: {
					enumerable: true,
					value: worldTransform
				},
				position: {
					enumerable: true,
					value: transform.position
				},
				scale: {
					enumerable: true,
					value: transform.scale
				},
				rotation: {
					enumerable: true,
					get: function () {
						return transform.rotation;
					},
					set: function (value) {
						transform.rotation = value;
					}
				},
				worldPosition: {
					enumerable: true,
					value: worldTransform.position
				},
				worldScale: {
					enumerable: true,
					value: worldTransform.scale
				},
				worldRotation: {
					enumerable: true,
					get: function () {
						return worldTransform.rotation;
					},
					set: function (value) {
						worldTransform.rotation = value;
					}
				}
			});

			this.on('loaded', function () {
				this.onLoad();
			}, this);

			this.on('destroy', function () {
				this.onDestroy();
			}, this);
		},

		onLoad: function () {
			// Override in submodule
		},

		onDestroy: function () {
			// Override in submodule
		},

		//translateOnRotation: function (value, rotation) {
		//	var localRotation = this.parent.worldRotation - rotation;
		//	this.position.set(
		//		this.position.x + value * Math.cos(localRotation),
		//		this.position.y + value * Math.sin(localRotation)
		//	);
		//},
		//
		//translateOnAxis: function (value, axis) {
		//	this.translateOnRotation(value, Math.atan2(axis.y, axis.x));
		//},
		//
		//translate: function (translation) {
		//	this.translateOnAxis(translation.length(), translation);
		//},
		//
		///**
		// * Translates object in screen space, i.e. horizontally relative to the page.
		// * Positive: right
		// * Negative: left
		// *
		// * @param value The amount to translate
		// */
		//translateX: function (value) {
		//	this.translateOnRotation(value, 0);
		//},
		//
		///**
		// * Translates object in screen space, i.e. vertically relative to the page.
		// * Positive: Up
		// * Negative: Down
		// *
		// * @param value The amount to translate
		// */
		//translateY: function (value) {
		//	this.translateOnRotation(value, Math.TAU / 4);
		//},
		//
		add: function (child) {
			if (!(child instanceof Object2D)) {
				throw new Error('Object2D: Cannot add child which is not of type Object2D');
			}
			if (child.parent) {
				throw new Error('Object2D: Child already has parent, remove object from parent first');
			}
			child.parent = this;
			this.children.push(child);
			return child;
		},

		remove: function () {
			this.trigger('remove');
			Backbone.View.prototype.remove.apply(this, arguments);
		},

		removeAll: function () {
			this.children.forEach(child => {
				child.removeAll();
				child.trigger('remove');
			});
			this.children.length = 0;
		},

		destroy: function () {
			this.trigger('destroy');
			Backbone.View.prototype.destroy.apply(this, arguments);
		},

		destroyAll: function () {
			this.children.forEach(child => {
				child.trigger('remove');
				child.destroyAll();
				child.trigger('destroy');
			});
			this.children.length = 0;
		},

		updateLocal: function (force) {
			this.transform.copy(this.worldTransform);

			if (this.parent) {
				this.parent.updateWorld(force);
				this.transform.worldToLocal(this.parent.worldTransform)
			}
		},

		updateWorld: function (force) {
			if (this.parent && !this.detached) {
				this.parent.updateWorld(force);
				this.worldTransform.copy(this.parent.worldTransform).applyTransform(this.transform);
			} else {
				this.worldTransform.copy(this.transform);
			}
		},

		toggle: function () {
			this.visible = !this.visible;
		},

		hide: function () {
			this.visible = false;
		},

		show: function () {
			this.visible = true;
		},

		shake: function (duration, amplitude, bounces) {
			// https://www.desmos.com/calculator/vaxe6wsqg6

			var scale = 7; // approx -ln(1E-3)
			if (duration === undefined) {
				duration = 1000;
			}
			if (amplitude === undefined) {
				amplitude = 10;
			}
			if (bounces === undefined) {
				bounces = 20;
			}
			new TWEEN.Tween({obj: this, last: 0}).to({}, duration).onUpdate(function (t) {
				var y = amplitude * Math.sin(bounces * Math.TAU * t) * Math.exp(-scale * t);
				this.obj.position.x += y - this.last;
				this.last = y;
			}).start();
		}
	});

	return Object2D;

});

