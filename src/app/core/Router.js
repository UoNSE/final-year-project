define(function (require) {

	var Backbone = require('backbone');

	return Backbone.Router.extend({

		routes: {
			'': 'menu',
			'start': 'start'
        },

		initialize: function (scene) {
			this.scene = scene;
		},

		menu: function () {
			this.load('Menu');
		},

		start: function () {
			this.load('Start');
		},

		load: function (page) {
			require(['page/' + page], function (Page) {
				this.scene.removeAll();
				this.scene.add(new Page());
			}.bind(this));
		}

	});

});
