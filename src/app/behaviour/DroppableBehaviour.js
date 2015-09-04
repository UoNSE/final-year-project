define(function (require) {
	'use strict';

	function DroppableBehaviour (multiTouchElement, multiTouchManager, options) {

		this.multiTouchElement = multiTouchElement;
		this.droppableTypes = options.types ? Array.isArray(options.types) ? options.types : [options.types] : [];
		this.multiTouchElement.component.on({
			touchenter: this.onTouchEnter.bind(this),
			touchleave: this.onTouchLeave.bind(this),
			dragendsink: this.onDragEndSink.bind(this),
			dragendsource: this.onDragEndSource.bind(this)
		});
	}

	DroppableBehaviour.prototype.onMouseEnter = function () {
		this.multiTouchElement.component.trigger('mouseenter');
	};

	DroppableBehaviour.prototype.onMouseLeave = function () {
		this.multiTouchElement.component.trigger('mouseleave');
	};

	DroppableBehaviour.prototype.onTouchEnter = function (event) {
		this.drop(event, 'dropenter');
	};

	DroppableBehaviour.prototype.onTouchLeave = function (event) {
		this.drop(event, 'dropleave');
	};


	DroppableBehaviour.prototype.onDragEndSink = function (event) {
		this.drop(event, 'dropsink');
	};

	DroppableBehaviour.prototype.onDragEndSource = function (event) {
		this.drop(event, 'dropsource');
	};

	DroppableBehaviour.prototype.drop = function (event, trigger) {
		if (this.droppableTypes.indexOf(event.draggable.constructor >= 0)) {
			this.multiTouchElement.component.trigger(trigger, {
				draggable: event.draggable,
				droppable: this.multiTouchElement.component
			});
		}
	};

	return DroppableBehaviour;

});

