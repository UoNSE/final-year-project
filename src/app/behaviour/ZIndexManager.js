define(function (require) {

	'use strict';

	function ZIndexManager () {

		this.backIndex = 0;
		this.frontIndex = 0;
		this.elements = {};

	}

	ZIndexManager.prototype.registerElement = function (multiTouchElement) {

		this.elements[this.frontIndex] = multiTouchElement;
		multiTouchElement.element.css('zIndex', this.frontIndex);
		this.frontIndex++;

	};

	ZIndexManager.prototype.onTouchStart = function (element, event) {

		this.bringToFront(element);

	};

	ZIndexManager.prototype.bringToFront = function (element) {

		element.css('zIndex', this.frontIndex);
		this.frontIndex++;

	};

	ZIndexManager.prototype.sendToBack = function (element) {

		element.css('zIndex', this.backIndex);
		this.backIndex--;

	};

	return ZIndexManager;

});
