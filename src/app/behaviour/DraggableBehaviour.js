define(function (require) {

	'use strict';

	var $ = require('jquery');

	function DraggableBehaviour (multiTouchElement, multiTouchManager, options) {

		this.multiTouchElement = multiTouchElement;
		this.multiTouchManager = multiTouchManager;

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
		this.multiTouchElement.component.trigger('drag', {
			draggable: this.multiTouchElement.component
		});
	};

	DraggableBehaviour.prototype.onTouchMove = function (element, event) {
		var touch = event.originalEvent.targetTouches[0];
		var x = touch.pageX;
		var y = touch.pageY;
		var elements = $(document.elementsFromPoint(x, y)).filter('section.component').not(this.multiTouchElement.element);
		elements.each(function (index, element) {
			var id = $(element).attr('id');
			var multiTouchElement = this.multiTouchManager.get(id);
			if (multiTouchElement) {
				multiTouchElement.component.trigger('draghover', {
					draggable: this.multiTouchElement.component,
					droppable: multiTouchElement.component
				});
			}
		}.bind(this));
	};

	DraggableBehaviour.prototype.onTouchEnd = function (element, event) {
		var touch = event.originalEvent.changedTouches[0];
		var x = touch.pageX;
		var y = touch.pageY;
		var elements = $(document.elementsFromPoint(x, y)).filter('section.component').not(this.multiTouchElement.element);
		elements.each(function (index, element) {
			var id = $(element).attr('id');
			var multiTouchElement = this.multiTouchManager.get(id);
			if (multiTouchElement) {
				multiTouchElement.component.trigger('dragendsink', {
					draggable: this.multiTouchElement.component,
					droppable: multiTouchElement.component
				});
			}
		}.bind(this));
		this.multiTouchElement.component.trigger('dragendsource', {
			draggable: this.multiTouchElement.component
		});
	};

	return DraggableBehaviour;

});

