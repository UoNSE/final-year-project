define(function (require) {

	'use strict';

	var $ = require('jquery');
	var Factory = require('Factory');
	var ZIndexManager = require('behaviour/ZIndexManager');
	var MultiTouchElement = require('behaviour/MultiTouchElement');
	var RotateTranslateScaleBehaviour = require('behaviour/RotateTranslateScaleBehaviour');

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
		var behaviour = new RotateTranslateScaleBehaviour();
		multiTouchElement.addBehaviour(behaviour);
		return multiTouchElement;

	};

	MultiTouchManager.prototype.addElement = function (element) {

		var multiTouchElement = new MultiTouchElement(element);
		this.elements.push(multiTouchElement);
		this.zIndexManager.registerElement(multiTouchElement);
		multiTouchElement.addBehaviour(this.zIndexManager);
		return multiTouchElement;

	};

	return Factory.createFactory(MultiTouchManager);

});

