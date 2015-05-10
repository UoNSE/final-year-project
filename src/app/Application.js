define( function (require) {

	'use strict';

	var $ = require('jquery');
	var MultiTouchManager = require('behaviour/MultiTouchManager');
	var RotateTranslateScaleBehaviour = require('behaviour/RotateTranslateScaleBehaviour');

	var multitouch = MultiTouchManager.getInstance();

	function Application () {

		this.elements = [];
		this.bindEvents();

	}

	Application.prototype.bindEvents = function () {

		$(document.body).mousedown(this.onBodyMouseDown.bind(this));
		$(window).on('keyup', this.onKeyUp.bind(this));
		$('#add-item').click(this.onAddItem.bind(this));

	};

	Application.prototype.onBodyMouseDown = function (event) {

		event.preventDefault();

	};

	Application.prototype.onKeyUp = function (event) {

		if (event.which === 27) { // ESC key
			for (var i = 0, len = this.elements.length; i < len; i++) {
				this.elements[i].remove();
			}
			this.elements.length = 0;
		}

	};

	Application.prototype.onAddItem = function () {

		var element = $('<div class="item">Hello World</div>');
		element.appendTo(document.body);
		element.offset({
			left: ($(window).width() - element.outerWidth()) / 2,
			top: ($(window).height() - element.outerHeight()) / 2
		});
		multitouch.addElementRTS(element);
		this.elements.push(element);

	};

	return Application;

});
