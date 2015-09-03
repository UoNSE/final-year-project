define(function (require) {

	var Backbone = require('backbone');
	var $ = require('jquery');

	var Cases = require('collection/Cases');

	return Backbone.View.extend({

		_baseStylePath: 'resources/css/',

		initialize: function (router) {
            this._router = router;
		},

		render: function (controller, options) {},

		/**
		 * Sets up and resolves a require function promise.
		 *
		 * @param path The path to require.
		 * @returns {Promise} The require promise.
		 * @private
		 */
		_requirePromise: function (path) {
			return new Promise(function (resolve) {
				require([path], function (module) {
					resolve(module);
				});
			});
		},

		/**
		 * Loads the configurations of a controller.
		 *
		 * @param route The current route.
		 * @param [options] The configuration options.
		 * @returns {Promise}
		 * @private
		 */
		_loadController: function (route, options) {
			var path = route + 'Controller';
			// Load the controller at the specified path.
			return this._requirePromise(path).then(function (Controller) {
				this.trigger('configureViewController', Controller);
				// Instantiate the controller.
				var controller = new Controller(options);
				// Trigger the back event for any listeners.
				this.trigger('configureBack', controller.displayBack);
				// Bind the events of the controller and load its styles.
				this._bindEvents(controller, options);
				this._loadStyles(controller.styles);
				this.render(controller);
				return Promise.resolve(controller);
			}.bind(this));
		},

		/**
		 * Binds events to the specified controller.
		 *
		 * @param controller The controller listening for events.
		 * @param options The configuration options for after render,
		 * @private
		 */
		_bindEvents: function (controller, options) {
			controller.on({
				addChildView: this.onAddChildView.bind(this, controller),
				afterRender: this.onAfterRender.bind(this, controller, options),
				back: this.onBack.bind(this)
			});
		},

		/**
		 * Loads CSS external stylesheets.
		 *
		 * @param styles The list of styles to load.
		 * @private
		 */
		_loadStyles: function (styles) {
			styles = styles ? Array.isArray(styles) ? styles : [styles] : [];
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
		 *
		 * @param controller
		 * @param route
		 * @param options
		 * @returns {Promise}
		 */
		onAddChildView: function (controller, route, options) {
			options.append = true;
			options.parent = controller;
			return this._loadController(route, options).then(function (childView) {
				childView.parent = controller;
				controller.childViews.push(childView);

			}.bind(this));
		},

		/**
		 * A render event triggered by a controller.
		 *
		 * @param controller The controller that triggered the render event.
		 * @param options The configuration options.
		 */
		onAfterRender: function (controller, options) {
			this.render(controller, options);
		},

		/**
		 * An event triggered when a controller requests to go back a page. This method bubbles the event up.
		 */
		onBack: function () {
			this.trigger('back');
		}

	});

});
