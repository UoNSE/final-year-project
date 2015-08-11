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
			return new Promise(function (resolve) {

				// TODO change to promises with require yeah
				this.listenToOnce(this._navigationLoader, 'afterRender', function (controller) {
					resolve(controller);
				}.bind(this));

				this._navigationLoader.insert(route, index, element);

			}.bind(this));
		}

	});

});

