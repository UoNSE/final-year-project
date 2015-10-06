define(function (require) {
	'use strict';

	var $ = require('jquery');
	var Factory = require('Factory');
	var ZIndexManager = require('behaviour/ZIndexManager');
	var MultiTouchElement = require('behaviour/MultiTouchElement');
	var RotateTranslateScaleBehaviour = require('behaviour/RotateTranslateScaleBehaviour');
	var DraggableBehaviour = require('behaviour/DraggableBehaviour');
	var DroppableBehaviour = require('behaviour/DroppableBehaviour');

	function MultiTouchManager() {
		this.elements = [];
		this.elements.map = {};
		this.zIndexManager = new ZIndexManager();

		$(window).on('touchmove', function (event) {
			// Prevent the browser's inbuilt touch gestures
			event.preventDefault();
		});
	}

	Object.assign(MultiTouchManager.prototype, {
		get: function (id) {
			return this.elementsHash[id];
		},

		addElement: function (component) {
			var multiTouchElement = new MultiTouchElement(component);

			// Add a remove binding for when the element is no longer on the DOM.
			$(multiTouchElement).on('remove', this.onRemove.bind(this));

			this.elements.push(multiTouchElement);
			this.elements.map[component.id] = multiTouchElement;
			this.zIndexManager.registerElement(multiTouchElement);
			multiTouchElement.addBehaviour(this.zIndexManager);
			return multiTouchElement;
		},

		makeRTS: function (multiTouchElement) {
			var behaviour = new RotateTranslateScaleBehaviour(multiTouchElement);
			multiTouchElement.addBehaviour(behaviour);
			return multiTouchElement;
		},

		makeDraggable: function (multiTouchElement, options) {
			var behaviour = new DraggableBehaviour(multiTouchElement, this, options);
			multiTouchElement.addBehaviour(behaviour);
			return multiTouchElement;
		},

		makeDroppable: function (multiTouchElement, options) {
			var behaviour = new DroppableBehaviour(multiTouchElement, this, options);
			multiTouchElement.addBehaviour(behaviour);
			return multiTouchElement;
		},

		onRemove: function (event) {
			this.remove(event.currentTarget);
		},

		remove: function (multiTouchElement) {
			this.elements.splice(this.elements.indexOf(multiTouchElement), 1);
			delete this.elements.map[multiTouchElement.component.id];
			this.zIndexManager.removeElement(multiTouchElement);
		}
	});

	return Factory.createFactory(MultiTouchManager);

});

