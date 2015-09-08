define(function (require) {
	'use strict';

	function DroppableBehaviour (multiTouchElement, multiTouchManager, options) {

		this.multiTouchElement = multiTouchElement;
		this.component = multiTouchElement.component;
		this.droppableTypes = options.types ? Array.isArray(options.types) ? options.types : [options.types] : [];
		this.component.on({
			touchenter: this.onTouchEnter.bind(this),
			touchleave: this.onTouchLeave.bind(this),
			dragendsink: this.onDragEndSink.bind(this),
			dragendsource: this.onDragEndSource.bind(this)
		});
	}

	DroppableBehaviour.prototype.onMouseEnter = function () {
		this.component.trigger('mouseenter');
	};

	DroppableBehaviour.prototype.onMouseLeave = function () {
		this.component.trigger('mouseleave');
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
			this.component.trigger(trigger, {
				draggable: event.draggable,
				droppable: this.component
			});
		}
	};

	return DroppableBehaviour;

});

