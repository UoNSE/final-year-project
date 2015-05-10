define( function (require) {

	'use strict';

	var $ = require('jquery');
	var MultiTouchManager = require('behaviour/MultiTouchManager');
	var RotateTranslateScaleBehaviour = require('behaviour/RotateTranslateScaleBehaviour');

	var multitouch = MultiTouchManager.getInstance();

	var elements = [];

	$(document.body).mousedown(function(event) {
		// prevent text selection on double click
		event.preventDefault();
	});

	$(window).on('keyup', function (event) {

		if (event.which === 27) {
			for (var i = 0, len = elements.length; i < len; i++) {
				elements[i].remove();
			}
			elements.length = 0;
		}

	});

	$('#add-item').click(function () {

		var element = $('<div class="item">Hello World</div>');
		element.appendTo(document.body);
		element.offset({
			left: ($(window).width() - element.outerWidth()) / 2,
			top: ($(window).height() - element.outerHeight()) / 2
		});
		multitouch.addElementRTS(element);
		elements.push(element);

	});

});
