define(function (require) {

	'use strict';

	var Backbone = require('backbone');
	var $ = require('jquery');

	var Loader = require('controller/Loader');

	return Backbone.View.extend({

		_loader: new Loader(),

		initialize: function () {

			this._loader.load('/');
			this._bindEvents();

		},

		_bindEvents: function () {

			$(document.body).on('mousedown', this._onBodyMouseDown.bind(this));
			$(window).on('keyup', this._onKeyUp.bind(this));

		},

		_onBodyMouseDown: function (event) {

			event.preventDefault();

		},

		_onKeyUp: function (event) {

			if (event.which === 27) { // ESC key
				// Stop all videos from playing/leaking.
				this.elements.filter('video').trigger('pause').attr('src', '');
				this.elements.remove();
				this.elements = $();
			}

		}

	});

});
