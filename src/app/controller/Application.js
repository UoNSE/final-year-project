define(function (require) {

	'use strict';

	var Backbone = require('backbone');
	var Router = require('controller/Router');

	return Backbone.View.extend({

		_router: null,

		initialize: function () {
			this._router = new Router();
			Backbone.history.start({pushState: true});
		}

	});

});
