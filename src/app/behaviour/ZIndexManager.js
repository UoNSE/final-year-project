define(function (require) {
	'use strict';

	function ZIndexManager () {
		this.backIndex = 0;
		this.frontIndex = 0;
		this.elements = {};
	}

	Object.assign(ZIndexManager.prototype, {
		registerElement: function (multiTouchElement) {
			this.elements[this.frontIndex] = multiTouchElement;

			var element = multiTouchElement.element;
			element.css('zIndex', this.frontIndex);
			this.frontIndex++;

			multiTouchElement.component.on({
				bringToFront: this.bringToFront.bind(this, element),
				sendToBack: this.sendToBack.bind(this, element)
			});

			multiTouchElement.element.css('zIndex', this.frontIndex);
			this.frontIndex++;

		},

		removeElement: function (multiTouchElement) {
			var key = this.findElementKey(multiTouchElement);
			if (key) {
				delete this.elements[key];
			}
		},

		findElementKey: function (multiTouchElement) {
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
		},

		onMouseDown: function (element, event) {
			this.bringToFront(element);
		},

		onTouchStart: function (element, event) {
			this.bringToFront(element);
		},

		bringToFront: function (element) {
			element.css('zIndex', this.frontIndex);
			this.frontIndex++;
		},

		sendToBack: function (element) {
			element.css('zIndex', this.backIndex);
			this.backIndex--;
		}
	});

	return ZIndexManager;

});
