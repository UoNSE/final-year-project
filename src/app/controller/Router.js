define(function (require) {

	var Backbone = require('backbone');

	return Backbone.Router.extend({

		routes: {
			'': 'menu'
        },

		menu: function () {
			this.load('Menu');
		},

		load: function (page) {
			require(['page/' + page], function (Page) {
				var page = new Page();
				page.render();
			});
		}

	});

});
