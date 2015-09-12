define(function (require, exports, module) {
	'use strict';

	var Backbone = require('backbone');
	var $ = require('jquery');

	return Backbone.Router.extend({
		initialize: function (scene, camera) {
			this.scene = scene;
			this.camera = camera;
			this.pageName = null;
			this.page = null;

			this.urlParams = {};

			// Note: add new routes in main.js
			this.routes = this.setupRoutes(module.config().routes);

			// Note: update sitemap in main.js
			this.sitemap = this.setupSitemap(module.config().sitemap, null);
		},

		setupSitemap: function (sitemap, parentPage) {
			let map = {};
			if (sitemap === null) {
				return map;
			}
			return Object.keys(sitemap).reduce((map, page) => {
				map[page] = parentPage;
				Object.assign(map, this.setupSitemap(sitemap[page], page));
				return map;
			}, map);
		},

		setupRoutes: function (routes) {
			var map = {};
			var namedParam = /(\(\?)?:\w+/g;
			$.each(routes, (url, page) => {
				map[page] = url;
				var match;
				var names = [];
				while ((match = namedParam.exec(url)) !== null) {
					names.push(match[0].substring(1));
				}
				this.route(url, page, function () {
					this.urlParams = {};
					for (var i = 0, len = names.length; i < len; i++) {
						this.urlParams[names[i]] = arguments[i];
					}
					this.load(page, this.urlParams, url);
				}.bind(this));
			});
			return map;
		},

		resolveRoute: function (route) {
			Object.keys(this.urlParams).forEach(key => {
				route = route.replace(':' + key, this.urlParams[key]);
			});
			return route;
		},

		load: function (pageName, urlParams) {
			require(['page/' + pageName], function (Page) {
				this.scene.destroyAll();
				this.pageName = pageName;
				this.page = this.scene.add(new Page(this, this.camera, urlParams));
			}.bind(this));
		},

		back: function () {
			var previous = this.sitemap[this.pageName];
			var route = this.routes[previous];
			var url = this.resolveRoute(route);
			this.navigate(url, {trigger: true});
		}
	});

});
