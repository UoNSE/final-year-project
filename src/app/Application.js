define(function (require) {

	'use strict';

	var $ = require('jquery');
	var Content = require('controller/Content');

	var Template = require('controller/Template');

	function Application () {

		this.content = new Content();
		this.content.load('controller/Main');
		this.bindEvents();

	}

	Application.prototype.bindEvents = function () {

		$(document.body).on('mousedown', this.onBodyMouseDown.bind(this));
		$(window).on('keyup', this.onKeyUp.bind(this));

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

	return Application;

});
