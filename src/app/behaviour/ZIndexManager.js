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

	ZIndexManager.prototype.removeElement = function (multiTouchElement) {

		var key = this.findElementKey(multiTouchElement);
		if (key) {
			delete this.elements[key];
		}

	};

	ZIndexManager.prototype.findElementKey = function (multiTouchElement) {

		var elements = this.elements;
		for (var key in elements) {
			if (elements.hasOwnProperty(key)) {
				var element = this.elements[key];
				if (element === multiTouchElement) {
					return key;
				}
			}
		}

		return null;

	};

	ZIndexManager.prototype.onMouseDown = function (element, event) {

		this.bringToFront(element);

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
