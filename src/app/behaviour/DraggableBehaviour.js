define(function (require) {

	'use strict';

	var $ = require('jquery');

	function DraggableBehaviour (element) {

		element.element.css('position', 'absolute');

		this.element = element;

	}

	DraggableBehaviour.prototype.onMouseDown = function (element, event) {

		var $element = $(this.element);

		var $el = this.element.element;
		$el.css('pointer-events', 'none');
		$el.fadeTo('fast', 0.65);

		$element.trigger('drag');

	};

	DraggableBehaviour.prototype.onMouseUp = function (element, event) {

		var $element = $(this.element);

		var $el = this.element.element;
		$el.css('pointer-events', 'all');
		$el.fadeTo('fast', 1);

		$element.trigger('drop');

	};

	DraggableBehaviour.prototype.onTouchStart = function (element, event) {


	};

	DraggableBehaviour.prototype.onTouchMove = function (element, event) {


	};

	return DraggableBehaviour;

});

