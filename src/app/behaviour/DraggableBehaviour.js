define(function (require) {

	'use strict';

	var glm = require('glmatrix');

	function DraggableBehaviour (element) {

		element.element.css('position', 'absolute');

		this.element = element;

	}

	DraggableBehaviour.prototype.onMouseDown = function (element, event) {

		var $element = this.element.element;
		$element.css('pointer-events', 'none');
		$element.fadeTo('fast', 0.65);

	};

	DraggableBehaviour.prototype.onMouseUp = function (element, event) {

		var $element = this.element.element;
		$element.css('pointer-events', 'all');
		$element.fadeTo('fast', 1);

	};

	DraggableBehaviour.prototype.onTouchStart = function (element, event) {


	};

	DraggableBehaviour.prototype.onTouchMove = function (element, event) {


	};

	return DraggableBehaviour;

});

