define(function (require) {

	var Backbone = require('backbone');

	return Backbone.Router.extend({

		routes: {
			'': 'menu'
        },

		initialize: function (scene) {
			this.scene = scene;
		},

		menu: function () {
			this.load('Menu');
		},

		load: function (page) {
			require(['page/' + page], function (Page) {
				this.scene.add(new Page());
			}.bind(this));
		}

	});

});
