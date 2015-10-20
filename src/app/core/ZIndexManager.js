define(function (require) {
	'use strict';

	var Factory = require('Factory');

	function ZIndexManager () {
		this.backIndex = 0;
		this.frontIndex = 0;
		this.components = {};
	}

	Object.assign(ZIndexManager.prototype, {
		registerComponent: function (component) {
			this.components[this.frontIndex] = component;
			component.zIndex = this.frontIndex;
			this.frontIndex++;
		},

		removeComponent: function (component) {
			var key = this.findElementKey(component);
			if (key) {
				delete this.elements[key];
			}
		},

		findElementKey: function (component) {
			var elements = this.elements;
			for (var key in elements) {
				if (elements.hasOwnProperty(key)) {
					var element = this.elements[key];
					if (element === component) {
						return key;
					}
				}
			}
			return null;
		},

		bringToFront: function (component, propagateToChildren) {
			component.zIndex = this.frontIndex;
			this.frontIndex++;
			if (propagateToChildren !== false) {
				component.children.forEach(child => {
					child.bringToFront();
				});
			}
		},

		sendToBack: function (component, propagateToChildren) {
			component.zIndex = this.backIndex;
			this.backIndex--;
			if (propagateToChildren !== false) {
				component.children.forEach(child => {
					child.sendToBack();
				});
			}
		}
	});

	return Factory.createFactory(ZIndexManager);

});
