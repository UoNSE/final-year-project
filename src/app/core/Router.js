define(function (require, exports, module) {

	var Backbone = require('backbone');
	var $ = require('jquery');

	return Backbone.Router.extend({

		initialize: function (scene) {
			this.scene = scene;

			// Note: add new routes in main.js
			this.setupRoutes(module.config().routes);
		},

		setupRoutes: function (routes) {
			var namedParam    = /(\(\?)?:\w+/g;
			$.each(routes, function (url, page) {
				var match;
				var names = [];
				while ((match = namedParam.exec(url)) !== null) {
					names.push(match[0].substring(1));
				}
				this.route(url, page, function () {
					var urlParams = {};
					for (var i = 0, len = names.length; i < len; i++) {
						urlParams[names[i]] = arguments[i];
					}
					this.load(page, urlParams);
				}.bind(this));
			}.bind(this));
		},

		load: function (page, urlParams) {
			require(['page/' + page], function (Page) {
				this.scene.removeAll();
				this.scene.add(new Page(urlParams));
			}.bind(this));
		}

	});

});
