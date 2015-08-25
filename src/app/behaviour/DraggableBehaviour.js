define(function (require) {

	'use strict';

	var glm = require('glmatrix');

	function DraggableBehaviour (element) {

		element.element.css('position', 'absolute');

		this.element = element;

	}

	DraggableBehaviour.prototype.onMouseDown = function (element, event) {

		this.element.element.css('pointer-events', 'none');

	};

	DraggableBehaviour.prototype.onMouseUp = function (element, event) {

		this.element.element.css('pointer-events', '');

	};

	DraggableBehaviour.prototype.onTouchStart = function (element, event) {


	};

	DraggableBehaviour.prototype.onTouchMove = function (element, event) {


	};

	return DraggableBehaviour;

});

