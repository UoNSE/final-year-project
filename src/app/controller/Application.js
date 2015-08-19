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
		}

	});

});
