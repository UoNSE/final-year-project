define(function (require) {

	'use strict';

	var $ = require('jquery');

	function DraggableBehaviour (multiTouchElement, multiTouchManager, options) {

		this.multiTouchElement = multiTouchElement;
		this.multiTouchManager = multiTouchManager;
		this.options = options;
		this.dragging = {};
		this.bindEvents();

	}

	DraggableBehaviour.prototype.bindEvents = function () {
		this.multiTouchElement.component.on({
			drag: this.onDrag.bind(this)
		});
	};

	DraggableBehaviour.prototype.onDrag = function () {
		var opacity = this.options.opacity;
		if (opacity) {
			this.multiTouchElement.component.$el.fadeTo('fast', opacity);
		}
	};

	DraggableBehaviour.prototype.onMouseDown = function (element, event) {
		this.drag();
	};

	DraggableBehaviour.prototype.onMouseMove = function (element, event) {
		this.dragMove(event.pageX, event.pageY);
	};


	DraggableBehaviour.prototype.onMouseUp = function (element, event) {
		this.dragEnd(event.pageX, event.pageY);
	};

	DraggableBehaviour.prototype.onTouchStart = function (element, event) {
		this.drag();
	};

	DraggableBehaviour.prototype.onTouchMove = function (element, event) {
		var touch = event.originalEvent.targetTouches[0];
		this.dragMove(touch.pageX, touch.pageY);
	};

	DraggableBehaviour.prototype.onTouchEnd = function (element, event) {
		var touch = event.originalEvent.changedTouches[0];
		this.dragEnd(touch.pageX, touch.pageY);
	};

	DraggableBehaviour.prototype.drag = function () {
		this.multiTouchElement.component.trigger('drag', {
			draggable: this.multiTouchElement.component
		});
	};

	DraggableBehaviour.prototype.dragMove = function (x, y) {
		// Get the current intersection of elements.
		var $elements = $(document.elementsFromPoint(x, y)).filter('section.component').not(this.multiTouchElement.element);
		// Iterate through each element that has been dragged on.
		$.each(this.dragging, function (key, component) {
			// Check if we are no longer dragging an element, by checking if the element doesn't exist in the current intersection.
			if ($elements.index(component.$el) === -1) {
				// Trigger a touchleave event and remove the element from the set.
				component.trigger('touchleave');
				delete this.dragging[key];
			}
		}.bind(this));
		// Iterate through each element intersection.
		$elements.each(function (index, element) {
			// Get the multitouch element from its id.
			var id = $(element).attr('id');
			var multiTouchElement = this.multiTouchManager.get(id);
			// If the multitouch element exists, add the component to the list of components being hovered on and trigger a touch enter event.
			if (multiTouchElement) {
				this.dragging[id] = multiTouchElement.component;
				multiTouchElement.component.trigger('touchenter');
			}
		}.bind(this));
	};

	DraggableBehaviour.prototype.dragEnd = function (x, y) {
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

		var component = this.multiTouchElement.component;

		component.trigger('dragendsource', {
			draggable: this.multiTouchElement.component
		});

		component.$el.fadeTo('fast', 1);

	};

	return DraggableBehaviour;

});

