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
				// Instantiate the controller.
				var controller = new Controller();
				// Trigger the back event for any listeners.
				this.trigger('configureBack', controller.displayBack);
				// Bind the events of the controller and load its styles.
				this._bindEvents(controller, options);
				this._loadStyles(controller.styles);
				// Load the data models and template.
				return this._loadDataModels(controller).then(function () {
					return this._loadTemplate(route, controller);
				}.bind(this));
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
		 *
		 * @param controller
		 * @param selector
		 * @param route
		 * @returns {Promise}
		 */
		onAddChildView: function (controller, selector, route) {
			return this._loadController(route, {selector: selector}).then(function (childView) {
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
		},

		/**
		 * Loads the collections and model bound to a controller.
		 *
		 * @param controller The controller that contains the collection and model.
		 * @returns {Promise}
		 * @private
		 */
		_loadDataModels: function (controller) {
			return Promise.all([
				this._loadCollection(controller),
				this._loadModel(controller)
			]);
		},

		/**
		 * Fetches the data model if a url exists and resolves the underlying promise.
		 *
		 * @param url The url on the data model.
		 * @param dataModel The data model that may contain information to fetch.
		 * @returns {Promise}
		 * @private
		 */
		_fetchDataModel: function (url, dataModel) {
			if (url) {
				return new Promise(function (resolve) {
					this.listenTo(dataModel, 'sync', function () {
						resolve();
					});
					dataModel.fetch();
				}.bind(this));
			} else {
				return Promise.resolve();
			}
		},

		/**
		 * Loads a collection to the specified controller.
		 *
		 * @param controller The controller that contains the data model.
		 * @returns {Promise}
		 * @private
		 */
		_loadCollection: function (controller) {
			var key = 'collection';
			var route = controller[key];
			if (route) {
				var path = key + '/' + route;
				return this._requirePromise(path).then(function (Collection) {
					// Instantiate the collection and fetch its data if it contains a url.
					var collection = new Collection();
					controller.collection = collection;
					// Fetch the data model.
					return this._fetchDataModel(collection.url, collection);
				}.bind(this));
			} else {
				// Nothing to load, resolve the promise.
				return Promise.resolve();
			}
		},

		/**
		 * Loads a model to the specified controller.
		 *
		 * @param controller The controller that contains the model.
		 * @param options The configuration options.
		 * @returns {Promise}
		 * @private
		 */
		_loadModel: function (controller, options) {
			var key = 'model';
			var route = controller[key];
			// Set the model of the controller.
			controller.model = new Backbone.Model();
			this.trigger('loadModel', controller.model, options);
			if (route) {
				var path = key + '/' + route;
				this._requirePromise(path).then(function (Model) {
					// Get the name of the model.
					var name = route.split('/').pop().toLowerCase();
					// Instantiate the model and fetch its data if it contains a url.
					var model = new Model();
					// Set the model using its name.
					controller.model.set(name, model);
					// Fetch the data model.
					return this._fetchDataModel(resolve, model.has('url'), model);
				}.bind(this));
			} else {
				return Promise.resolve();
			}
		},

		/**
		 * Loads the template associated with a route and renders the view.
		 *
		 * @param route The base path to the view and controller.
		 * @param controller The controller that contains the template and render information.
		 * @returns {Promise}
		 * @private
		 */
		_loadTemplate: function (route, controller) {
			if (controller.template !== false) {
				var path = 'text!' + route + 'View.html';
				return this._requirePromise(path).then(function (template) {
					controller.template = template;
					return this._renderView(controller);
				}.bind(this));
			} else {
				return this._renderView(controller);
			}
		},

		/**
		 * Renders a view by calling the render function of both the loader and the controller.
		 *
		 * @param controller The controller associated with the view.
		 * @returns {Promise}
		 * @private
		 */
		_renderView: function (controller) {
			controller.trigger('beforeRender');
			return new Promise(function (resolve) {
				this.listenToOnce(controller, 'afterRender', function () {
					controller.trigger('ready');
					resolve(controller);
				});
				controller.render();
			}.bind(this));
		}

	});

});
