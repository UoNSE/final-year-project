define(function (require) {

	var Backbone = require('backbone');

	return Backbone.Router.extend({

		routes: {
			'': 'start',
			'start': 'start',
			'cases': 'cases',
			'cases/:id/overview': 'overview'
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

		cases: function () {
			this.load('Cases');
		},

		overview: function (id) {
			this.load('Overview'); // TODO: magically insert id
		},

		load: function (page) {
			require(['page/' + page], function (Page) {
				this.scene.removeAll();
				this.scene.add(new Page());
			}.bind(this));
		}

	});

});
