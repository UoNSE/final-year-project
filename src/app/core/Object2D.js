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
		initialize: function () {
			this.id = 'component-' + MathUtil.generateUUID(8);
			this.children = [];
			this.needsWorldUpdate = true;

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
		},
		onLoad: function () {
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
			child.parent = this;
			this.children.push(child);
			return child;
		},
		removeAll: function () {
			this.children.forEach(function (child) {
				child.trigger('removechild');
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
			if (this.parent) {
				this.parent.updateWorld(force);
				this.worldTransform.copy(this.parent.worldTransform).applyTransform(this.transform);
			} else {
				this.worldTransform.copy(this.transform);
			}
		}
	});

	return Object2D;

});

