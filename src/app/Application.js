define(function (require) {

	'use strict';

	var $ = require('jquery');
	var MultiTouchManager = require('behaviour/MultiTouchManager');
	var RotateTranslateScaleBehaviour = require('behaviour/RotateTranslateScaleBehaviour');
	var Box = require('view/Box');
	var Template = require('view/Template');
	var Video = require('view/Video');

	function Application () {

		this.elements = $();
		this.multitouch = MultiTouchManager.getInstance();
		this.bindEvents();

	}

	Application.prototype.bindEvents = function () {

		$(document.body).on('mousedown', this.onBodyMouseDown.bind(this));
		$(window).on('keyup', this.onKeyUp.bind(this));
		$('#add-item').on('click', this.onAddItem.bind(this));
		$('#toggle-navigation').on('click', this.onToggleNavigation.bind(this));

	};

	Application.prototype.onBodyMouseDown = function (event) {

		event.preventDefault();

	};

	Application.prototype.onKeyUp = function (event) {

		if (event.which === 27) { // ESC key
			// Stop all videos from playing/leaking.
			this.elements.filter('video').trigger('pause').attr('src', '');
			this.elements.remove();
			this.elements = $();
		}

	};

	Application.prototype.onAddItem = function () {

		var urls = ['box.gif', 'spiral.gif', 'torus.gif', 'triangle.gif'];
		var url = urls[Math.floor(Math.random() * urls.length)];
		var elements = [
			Box,
			Template,
			Video
			/*'<img src="resources/images/' + url + '" class="item">',
			'<video src="resources/video/hifi.mp4" type="video/mp4" class="item" autoplay loop muted>',
			'<video src="resources/video/hifi2.mp4" type="video/mp4" class="item" autoplay loop muted>',
			'<video src="resources/video/animation.mp4" type="video/mp4" class="item" autoplay loop muted>',
			'<div class="item">Hello World</div>'*/
			//'<iframe src="https://www.youtube.com/embed/SLaYPmhse30?rel=0&autoplay=1" frameborder="0" class="item"></iframe>'
		];
		var element = $(new (elements[Math.floor(Math.random() * elements.length)])().el);
		//var element = $(elements[Math.floor(Math.random() * elements.length)]);
		element.offset({
			left: ($(window).width() - element.outerWidth()) / 2,
			top: ($(window).height() - element.outerHeight()) / 2
		});
		element.appendTo(document.body);
		var colors = ['#ff0000', '#ffffff', '#d4ee9f'];
		element.css('backgroundColor', colors[Math.floor(Math.random() * colors.length)]);
		this.multitouch.addElementRTS(element);
		this.elements = this.elements.add(element);

	};

	Application.prototype.onToggleNavigation = function (e) {
		e.preventDefault();
		$('#wrapper').toggleClass('toggled');
	};

	return Application;

});
