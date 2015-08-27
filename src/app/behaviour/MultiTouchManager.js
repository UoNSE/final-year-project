define(function (require) {

	'use strict';

	var $ = require('jquery');
	var Factory = require('Factory');
	var ZIndexManager = require('behaviour/ZIndexManager');
	var MultiTouchElement = require('behaviour/MultiTouchElement');
	var RotateTranslateScaleBehaviour = require('behaviour/RotateTranslateScaleBehaviour');
	var DraggableBehaviour = require('behaviour/DraggableBehaviour');

	function MultiTouchManager() {

		this.elements = [];
		this.zIndexManager = new ZIndexManager();

		$(window).on('touchmove', function (event) {

			// Prevent the browser's inbuilt touch gestures
			event.preventDefault();

		});

	}

	MultiTouchManager.prototype.addElementRTS = function (element) {

		var multiTouchElement = this.addElement(element);
		var behaviour = new RotateTranslateScaleBehaviour(multiTouchElement);
		multiTouchElement.addBehaviour(behaviour);
		return multiTouchElement;

	};

	MultiTouchManager.prototype.addElementDraggable = function (element) {

		var multiTouchElement = this.addElement(element);
		var behaviour = new DraggableBehaviour(multiTouchElement);
		multiTouchElement.addBehaviour(behaviour);
		return multiTouchElement;

	};

	MultiTouchManager.prototype.addElement = function (element) {

		var multiTouchElement = new MultiTouchElement(element);

		// Add a remove binding for when the element is no longer on the DOM.
		$(multiTouchElement).on('remove', this.onRemove.bind(this));

		this.elements.push(multiTouchElement);
		this.zIndexManager.registerElement(multiTouchElement);
		multiTouchElement.addBehaviour(this.zIndexManager);
		return multiTouchElement;

	};

	MultiTouchManager.prototype.onRemove = function (event) {
		var multiTouchElement = event.currentTarget;
		this.elements.splice(this.elements.indexOf(multiTouchElement), 1);
		this.zIndexManager.removeElement(multiTouchElement);

	};

	return Factory.createFactory(MultiTouchManager);

});

