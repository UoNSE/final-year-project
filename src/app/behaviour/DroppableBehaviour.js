define(function (require) {

	'use strict';

	var $ = require('jquery');

	function DroppableBehaviour (element) {

		element.element.css('position', 'absolute');
		this.element = element;

	}

	DroppableBehaviour.prototype.onMouseDown = function (element, event) {


	};

	DroppableBehaviour.prototype.onMouseUp = function (element, event) {


	};

	DroppableBehaviour.prototype.onTouchStart = function (element, event) {


	};

	DroppableBehaviour.prototype.onTouchMove = function (element, event) {


	};

	return DroppableBehaviour;

});

