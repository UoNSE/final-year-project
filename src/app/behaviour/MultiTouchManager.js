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
		this.elementsHash = {};
		this.zIndexManager = new ZIndexManager();

		$(window).on('touchmove', function (event) {
			// Prevent the browser's inbuilt touch gestures
			event.preventDefault();
		});
	}

	MultiTouchManager.prototype.get = function (id) {
		return this.elementsHash[id];
	};

	MultiTouchManager.prototype.addElement = function (component) {
		var multiTouchComponent = new MultiTouchElement(component);

		// Add a remove binding for when the element is no longer on the DOM.
		$(multiTouchComponent).on('remove', this.onRemove.bind(this));

		this.elements.push(multiTouchComponent);
		this.elementsHash[component.id] = multiTouchComponent;
		this.zIndexManager.registerElement(multiTouchComponent);
		multiTouchComponent.addBehaviour(this.zIndexManager);
		return multiTouchComponent;
	};

	MultiTouchManager.prototype.makeRTS = function (multiTouchComponent) {
		var behaviour = new RotateTranslateScaleBehaviour(multiTouchComponent);
		multiTouchComponent.addBehaviour(behaviour);
		return multiTouchComponent;
	};

	MultiTouchManager.prototype.makeDraggable = function (multiTouchComponent, options) {
		var behaviour = new DraggableBehaviour(multiTouchComponent, this, options);
		multiTouchComponent.addBehaviour(behaviour);
		return multiTouchComponent;
	};

	MultiTouchManager.prototype.makeDroppable = function (multiTouchComponent, options) {
		var behaviour = new DroppableBehaviour(multiTouchComponent, this, options);
		multiTouchComponent.addBehaviour(behaviour);
		return multiTouchComponent;
	};

	MultiTouchManager.prototype.onRemove = function (event) {
		this.remove(event.currentTarget);

	};

	MultiTouchManager.prototype.remove = function (multiTouchComponent) {
		this.elements.splice(this.elements.indexOf(multiTouchComponent), 1);
		delete this.elementsHash[multiTouchComponent.multiTouchElement.id];
		this.zIndexManager.removeElement(multiTouchComponent);
		multiTouchComponent.unbindEvents();
	};

	return Factory.createFactory(MultiTouchManager);

});

