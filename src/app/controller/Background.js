define(function (require) {

	var $ = require('jquery');
	var Controller = require('controller/Controller');
	var MultiTouchManager = require('behaviour/MultiTouchManager');
	var RotateTranslateScaleBehaviour = require('behaviour/RotateTranslateScaleBehaviour');
	var Box = require('controller/Box');
	var Video = require('controller/Video');
	/*var styles = [
		'../resources/css/case-information.css'
	];*/

	return Controller.extend({
		//styles: styles,
		elements: $(),
		multitouch: MultiTouchManager.getInstance(),
		urls: ['box.gif', 'spiral.gif', 'torus.gif', 'triangle.gif'],
		render: function () {
			this.addItems(5);
		},
		addItems: function (items) {
			for (var i = 0; i < items; i++) {
				var url = this.urls[Math.floor(Math.random() * urls.length)];
				var resources = [
					/*Box,
					 Video*/
					'<img src="resources/images/' + url + '" class="item">',
					'<video src="resources/video/hifi.mp4" type="video/mp4" class="item" autoplay loop muted>',
					'<video src="resources/video/hifi2.mp4" type="video/mp4" class="item" autoplay loop muted>',
					'<video src="resources/video/animation.mp4" type="video/mp4" class="item" autoplay loop muted>',
					'<div class="item">Hello World</div>'
					//'<iframe src="https://www.youtube.com/embed/SLaYPmhse30?rel=0&autoplay=1" frameborder="0" class="item"></iframe>'
				];
				//var element = $(new (elements[Math.floor(Math.random() * elements.length)])().el);
				var element = $(resources[Math.floor(Math.random() * resources.length)]);
				element.offset({
					left: ($(window).width() - element.outerWidth()) / 2,
					top: ($(window).height() - element.outerHeight()) / 2W
				});
				element.appendTo($('#content'));
				var colors = ['#ff0000', '#ffffff', '#d4ee9f'];
				element.css('backgroundColor', colors[Math.floor(Math.random() * colors.length)]);
				this.multitouch.addElementRTS(element);
				this.elements = this.elements.add(element);
			}
		}
	});

});
