define(function (require) {

	'use strict';

	var $ = require('jquery');

	function DraggableBehaviour (component) {

		this.component = component;

	}

	DraggableBehaviour.prototype.onMouseDown = function (element, event) {

		//var $element = $(this.element);
		//
		//var $el = this.element.element;
		//$el.css('pointer-events', 'none');
		//$el.fadeTo('fast', 0.65);
		//
		//$element.trigger('drag');

	};

	DraggableBehaviour.prototype.onMouseUp = function (element, event) {

		//var $element = $(this.element);
		//
		//var $el = this.element.element;
		//$el.css('pointer-events', 'all');
		//$el.fadeTo('fast', 1);
		//
		//$element.trigger('drop');

	};

	DraggableBehaviour.prototype.onTouchStart = function (element, event) {
		this.component.element.trigger('drag');
	};

	DraggableBehaviour.prototype.onTouchMove = function (element, event) {

	};

	DraggableBehaviour.prototype.onTouchEnd = function (element, event) {
		var touch = event.originalEvent.changedTouches[0];
		var x = touch.pageX;
		var y = touch.pageY;
		var elements = $(document.elementsFromPoint(x, y)).filter('section.component').not(this.component.element);
		if (elements.length > 0) {
			elements.trigger('drop');
			console.log('drop!');
		}
	};

	return DraggableBehaviour;

});

