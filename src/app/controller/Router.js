define(function (require) {

	var Backbone = require('backbone');

	return Backbone.Router.extend({

		routes: {
			'': 'menu'
        },

		initialize: function (scene) {
			this._scene = scene;
		},

		menu: function () {
			this.load('Menu');
		},

		load: function (page) {
			require(['page/' + page], function (Page) {
				//page.render();
				var page = new Page();
				this._scene.add(page);
				this._scene.render();
			}.bind(this));
		}

	});

});
