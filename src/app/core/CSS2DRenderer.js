define(function (require) {

	'use strict';

	var Scene = require('core/Scene');
	var Camera = require('core/Camera');
	var Transform = require('math/Transform');
	var $ = require('jquery');

	function CSS2DRenderer () {

	}

	CSS2DRenderer.prototype.render = function (selector, scene, camera) {
		var container = $(selector);
		var children = scene.children;
		var transform = camera.transform.getInverse();
		for (var i = 0, length = children.length; i < length; i++) {
			var child = children[i];
			this.renderObject(child, container, transform);
		}
	};

	CSS2DRenderer.prototype.renderObject = function (object, container, parentTransform) {
		var transform;

		if (object.needsWorldUpdate) {
			transform = object.worldTransform.copy(object.transform).applyTransform(parentTransform)
		} else {
			object.transform.copy(object.worldTransform);
			if (object.parent) {
				object.transform.worldToLocal(object.parent.worldTransform);
			}
		}

		this.renderObjectHTML(object, container, transform);
		var children = object.children;
		for (var i = 0, length = children.length; i < length; i++) {
			var child = children[i];
			this.renderObject(child, container, transform);
		}
		object.needsWorldUpdate = true;
	};

	CSS2DRenderer.prototype.renderObjectHTML = function (object, container, transform) {
		if (!object.added) {
			var element = object.render().$el;
			element.attr('id', object.id);
			container.append(element);
			object.added = true;
			return element;
		}
		this.applyTransform(object.$el, transform);
	};

	CSS2DRenderer.prototype.applyTransform = function (element, transform) {
		$(element).css({
			'transform': 'translate(calc(-50% + ' + transform.position.x + 'px), calc(-50% + ' + (-transform.position.y) + 'px))'
			+ ' rotateZ(' + (-transform.rotation / Math.TAU) + 'turn)'
			+ ' scale(' + transform.scale.x + ', ' + transform.scale.y + ')'
		});
	};

	return CSS2DRenderer;
});

