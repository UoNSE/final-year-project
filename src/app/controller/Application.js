define(function (require) {

	'use strict';

	var Backbone = require('backbone');
	var $ = require('jquery');

	$.fn.insertAt = function (index, element) {
		var lastIndex = this.children().size();
		if (index < 0) {
			index = Math.max(0, lastIndex + 1 + index)
		}
		this.append(element);
		if (index < lastIndex) {
			this.children().eq(index).before(this.children().last())
		}
		return this;
	};

	var Router = require('controller/Router');
	var Navigation = require('controller/Navigation');

	return Backbone.View.extend({

		_router: null,

		initialize: function () {
			var navigation = new Navigation();
			navigation.on('ready', function () {
				this._router = new Router(navigation);
				Backbone.history.start({pushState: true});
			});

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
