define(function (require) {

	'use strict';

	var $ = require('jquery');

	function DroppableBehaviour (multiTouchElement, multiTouchManager, options) {

		this.multiTouchElement = multiTouchElement;
		this.droppableTypes = options.types ? Array.isArray(options.types) ? options.types : [options.types] : [];
		this.multiTouchElement.component.on('draghover', this.onDragHover.bind(this));
		this.multiTouchElement.component.on('dragendsink', this.onDragEndSink.bind(this));
		this.multiTouchElement.component.on('dragendsource', this.onDragEndSource.bind(this));

	}

	DroppableBehaviour.prototype.onDragHover = function (element, event) {

		//this.multiTouchElement.component.$el.find('button').css('background-color', 'black !important');

	};

	DroppableBehaviour.prototype.onMouseDown = function (element, event) {


	};

	DroppableBehaviour.prototype.onMouseUp = function (element, event) {


	};

	DroppableBehaviour.prototype.onDragEndSink = function (event) {
		if (this.droppableTypes.indexOf(event.draggable.constructor >= 0)) {
			this.multiTouchElement.component.trigger('dropsink', {
				draggable: event.draggable,
				droppable: this.multiTouchElement.component
			});
		}
	};

	DroppableBehaviour.prototype.onDragEndSource = function (event) {
		if (this.droppableTypes.indexOf(event.draggable.constructor >= 0)) {
			this.multiTouchElement.component.trigger('dropsource', {
				draggable: event.draggable,
				droppable: this.multiTouchElement.component
			});
		}
	};

	DroppableBehaviour.prototype.onTouchMove = function (element, event) {


	};

	return DroppableBehaviour;

});

