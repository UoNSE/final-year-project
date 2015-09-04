define(function (require) {
	'use strict';

	function DroppableBehaviour (multiTouchElement, multiTouchManager, options) {

		this.multiTouchElement = multiTouchElement;
		this.droppableTypes = options.types ? Array.isArray(options.types) ? options.types : [options.types] : [];
		this.multiTouchElement.component.on({
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

