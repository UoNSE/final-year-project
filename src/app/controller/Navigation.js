define(function (require) {

	var Backbone = require('backbone');
	var NavigationLoader = require('controller/loader/Navigation');

	return Backbone.View.extend({

		_navigationLoader: null,

		back: null,

		initialize: function () {
			this._navigationLoader = new NavigationLoader();
			this.insertComponent('shared/navigation/back/Back', 0).then(function (controller) {
				this.back = controller;
				this.trigger('ready');
			}.bind(this));
		},

		insertComponent: function (route, index, element) {
			return this._navigationLoader.insert(route, index, element);
		}

	});

});

