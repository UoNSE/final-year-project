define(function (require) {

	var $ = require('jquery');
	var Handlebars = require('handlebars');
	var Controller = require('controller/Controller');
	var template = require('text!view/Background.html');
	var MultiTouchManager = require('behaviour/MultiTouchManager');
	var RotateTranslateScaleBehaviour = require('behaviour/RotateTranslateScaleBehaviour');
	var Box = require('controller/Box');
	var Video = require('controller/Video');
	/*var styles = [
		'../resources/css/case-information.css'
	];*/

	return Controller.extend({
		//styles: styles,
		template: Handlebars.compile(template),
		elements: $(),
		multitouch: MultiTouchManager.getInstance(),
		urls: ['box.gif', 'spiral.gif', 'torus.gif', 'triangle.gif'],
		render: function () {
			this.bindEvents();
			this.addItems(5);
		},
		bindEvents: function () {
			$('#back').on('click', this.onBack.bind(this));
		},
		addItems: function (items) {
			for (var i = 0; i < items; i++) {
				var url = this.urls[Math.floor(Math.random() * this.urls.length)];
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
					top: ($(window).height() - element.outerHeight()) / 2
				});
				element.appendTo($('#content'));
				var colors = ['#ff0000', '#ffffff', '#d4ee9f'];
				element.css('backgroundColor', colors[Math.floor(Math.random() * colors.length)]);
				this.multitouch.addElementRTS(element);
				this.elements = this.elements.add(element);
			}
		},
		onBack: function () {
			this.loadPrevious();
		}
	});

});
