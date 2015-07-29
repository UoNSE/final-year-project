define(function (require) {

	var Backbone = require('backbone');
	var Handlebars = require('handlebars');
	var $ = require('jquery');

	var Router = require('controller/Router');
	var Back = require('shared/navigation/back/BackController');

	return Backbone.View.extend({

		_url: null,
		_previous: [],
		_selector: '#content',
		_baseStylePath: '../resources/css/',

		_router: new Router(),
		_back: new Back(),

		initialize: function () {
			this._back.on('back', this._onBack.bind(this));
			this.insertController(this._back, $('body'), 0);
		},

		/**
		 * The render function that is called upon initialisation and when a new partial is being loaded.
		 */
		render: function () {
			var html = this.template ? this.template() : '';
			$(this._selector).html(html);
		},

		/**
		 * Loads the previous controller.
		 *
		 * @private
		 */
		_onBack: function () {
			if (this._previous.length > 0) {
				this.load(this._previous[this._previous.length - 1], false);
				this._previous.pop();
			}
		},

		/**
		 * Resolves a url by accessing the routes in the router.
		 *
		 * @param url The url to resolve.
		 * @returns {*}
		 * @private
		 */
		_resolveRoute: function (url) {
			return this._router.routes[url];
		},

		/**
		 * Loads a controller that contains the template, styles and scripts to load.
		 *
		 * @param url The url that maps to the Backbone view and controller.
		 * @param [isPrevious]
		 */
		load: function (url, isPrevious) {
			var route = this._resolveRoute(url);
			var path = route + 'Controller';
			// Load the controller at the specified path.
			require([path], function (Controller) {
				// Add the previous path if the current path exists.
				if (this._url && isPrevious !== false) {
					this._previous.push(this._url);
				}
				this._url = url;
				// Instantiate the controller.
				var controller = new Controller();
				// Bind the events of the controller and load the styles.
				this._bindEvents(controller);
				this._configureBack(controller.back);
				this._loadStyles(controller.styles);
				this._loadTemplate(route, controller);
			}.bind(this));
		},

		/**
		 * Binds events to the specified controller.
		 *
		 * @param controller The controller listening for events.
		 * @private
		 */
		_bindEvents: function (controller) {
			controller.on('add', this._onAdd.bind(this));
			controller.on('load', this.load.bind(this));
		},

		/**
		 * Loads the template associated with a route.
		 *
		 * @param route The base path to the view and controller.
		 * @param controller The controller that contains the template and render information.
		 * @private
		 */
		_loadTemplate: function (route, controller) {
			if (controller.template !== false) {
				var path = 'text!' + route + 'View.html';
				require([path], function (template) {
					this.template = Handlebars.compile(template);
					this._renderView(controller);
				}.bind(this));
			} else {
				this.template = '';
				this._renderView(controller);
			}
		},

		/**
		 * Renders a view by calling the render function of both the loader and the controller.
		 *
		 * @param controller The controller associated with the view.
		 * @private
		 */
		_renderView: function (controller) {
			this.render();
			if (controller.render) {
				controller.render($(this.selector));
			}
		},

		/**
		 * Loads CSS external stylesheets.
		 *
		 * @param styles The list of styles to load.
		 * @private
		 */
		_loadStyles: function (styles) {
			styles = styles || [];
			// Get the head from the HTML page.
			var head = $('head');
			// Load necessary CSS files.
			for (var i = 0, len = styles.length; i < len; i++) {
				var path = this._baseStylePath + styles[i];
				var css = $('<link rel="stylesheet" type="text/css" href="' + path + '">');
				head.append(css);
			}
		},

		/**
		 * Changes the visibility of the back button depending on the back configuration.
		 *
		 * @param back The back configuration.
		 * @private
		 */
		_configureBack: function (back) {
			var button = $(this._back.selector);
			if (back) {
				button.show();
			} else {
				button.hide();
			}
		},

		insertController: function (controller, element, index) {
			// Get the template from the controller.
			var template = controller.template;
			// Bind the events to the controller.
			this._bindEvents(controller);
			// Check if the element can be inserted.
			if (template && element) {
				element.children().eq(index).before(template());
			}
			if (controller.render) {
				controller.render();
			}
		},

		insert: function (path, element, index) {
			// Load the controller at the specified path.
			require([path], function (Controller) {
				this.insertController(new Controller(), element, index);
			}.bind(this));
		},

		/**
		 * Adds the template loaded from the path to the specified element.
		 *
		 * @param path The path to the controller.
		 * @param element The element having a template added to.
		 * @private
		 */
		_onAdd: function (path, element) {
			// TODO test
			this.insert(path, element, element.children().length);
		}

	});

});
