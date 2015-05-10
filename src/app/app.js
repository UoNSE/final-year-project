define( function (require) {

	'use strict';

	var $ = require('jquery');
	var MultiTouchManager = require('behaviour/MultiTouchManager');
	var RotateTranslateScaleBehaviour = require('behaviour/RotateTranslateScaleBehaviour');

	var multitouch = MultiTouchManager.getInstance();

	multitouch.addElementRTS($('#item'));

	$(document.body).mousedown(function(event) {
		event.preventDefault();
	});

	$('#add-item').click(function () {

		var element = $('<div class="item">Hello World</div>');
		element.appendTo(document.body);
		multitouch.addElementRTS(element);

	});

});
