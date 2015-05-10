define(function (require) {

	'use strict';

	function ZIndexManager () {

		this.firstIndex = 1;
		this.nextIndex = this.firstIndex;
		this.elements = {};

	}

	ZIndexManager.prototype.registerElement = function (multiTouchElement) {

		this.elements[this.nextIndex] = multiTouchElement;
		multiTouchElement.element.css('zIndex', this.nextIndex);
		this.nextIndex++;

	};

	ZIndexManager.prototype.onTouchStart = function (element, event) {

		this.bringToFront(element);

	};

	ZIndexManager.prototype.bringToFront = function (element) {

		element.css('zIndex', this.nextIndex);
		this.nextIndex++;

	};

	ZIndexManager.prototype.sendToBack = function (element) {

		element.css('zIndex', 0);

	};

	return ZIndexManager;

});
