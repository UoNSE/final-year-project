define(function (require) {

	var Backbone = require('backbone');
	var Handlebars = require('handlebars');
	var $ = require('jquery');

	return Backbone.View.extend({

		selector: '#content',
		_baseStylePath: '../resources/css/',

		/**
		 * The render function that is called when a new partial is being loaded.
		 *
		 * @param resolve The resolve promise.
		 * @param controller The controller that contains the template and model information.
		 * @param options The configuration options.
		 */
		render: function (resolve, controller, options) {
			options = options || {};
			var element = options.element || $(this.selector);
			var index = options.index;
			var html = '';
			//  Check if the controller contains a template.
			if (controller.template) {
				// Get the collection and model from the controller.
				var collection = controller.collection;
				var model = controller.model;
				// Set the html based on whether the controller contains a collection or model.
				if (collection) {
					html = controller.template(collection.toJSON());
				} else if (model) {
					html = controller.template(model.toJSON());
				} else {
					html = controller.template();
				}
			}
			// Set the html of the controller.
			controller.$el.html(html);
			// Either replace the html inside the element or insert the content at the specified index.
			if (index === undefined) {
				element.html(controller.$el);
			} else {
				element.insertAt(index, controller.$el);
			}
			resolve(controller);
		},

		/**
		 * Loads a partial given the route.
		 *
		 * @param route The route that maps to the Backbone view and controller.
		 * @param [element] An element to replace the HTML of.
		 * @returns {Promise}
		 */
		load: function (route, element) {
			return new Promise(function (resolve) {
				this._loadController(resolve, route, {
					element: element
				});
			}.bind(this));
		},

		/**
		 * Inserts a partial given the route, element and index.
		 *
		 * @param route The current route.
		 * @param element The element that will have a view inserted.
		 * @param index The index to insert the view into the element.
		 * @returns {Promise}
		 */
		insert: function (route, element, index) {
			return new Promise(function (resolve) {
				this._loadController(resolve, route, {
					element: element,
					index: index
				});
			}.bind(this));
		},

		/**
		 * Loads the configurations of a controller.
		 *
		 * @param resolve The promise function.
		 * @param route The current route.
		 * @param [options] The configuration options.
		 * @private
		 */
		_loadController: function (resolve, route, options) {
			var path = route + 'Controller';
			// Load the controller at the specified path.
			require([path], function (Controller) {
				// Instantiate the controller.
				var controller = new Controller();
				// Trigger the back event for any listeners.
				this.trigger('configureBack', controller.displayBack);
				// Bind the events of the controller and load its styles.
				this._bindEvents(route, controller);
				this._loadStyles(controller.styles);
				// Load the data models and template.
				this._loadDataModels(controller).then(function () {
					this._loadTemplate(resolve, route, controller, options);
				}.bind(this));
			}.bind(this));
		},

		/**
		 * Binds events to the specified controller.
		 *
		 * @param route
		 * @param controller The controller listening for events.
		 * @private
		 */
		_bindEvents: function (route, controller) {
			controller.on({
				render: this._onRender.bind(this, controller),
				afterRender: controller._onAfterRender,
				ready: controller._onReady,
				back: this._onBack.bind(this)
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
		 * A render event triggered by a controller.
		 *
		 * @param controller The controller that triggered the render event.
		 * @private
		 */
		_onRender: function (controller) {
			this.render(controller);
		},

		/**
		 * An event triggered when a controller requests to go back a page. This method bubbles the event up.
		 *
		 * @private
		 */
		_onBack: function () {
			this.trigger('back');
		},

		/**
		 * Loads the collections and model bound to a controller.
		 *
		 * @param controller The controller that contains the collection and model.
		 * @private
		 */
		_loadDataModels: function (controller) {
			return Promise.all([
				this._loadDataModel(controller, 'collection'),
				this._loadDataModel(controller, 'model')
			]);
		},

		/**
		 * Loads a data model to the specified controller. A data model is either a collection or model.
		 *
		 * @param controller The controller that contains the data model.
		 * @param key The key to use when querying the controller.
		 * @returns {Promise}
		 * @private
		 */
		_loadDataModel: function (controller, key) {
			return new Promise(function (resolve) {
				var dataModel = controller[key];
				if (dataModel) {
					dataModel = key + '/' + dataModel;
					require([dataModel], function (DataModel) {
						controller[key] = DataModel;
						resolve();
					});
				} else {
					resolve();
				}
			}.bind(this));
		},

		/**
		 * Loads the template associated with a route and renders the view.
		 *
		 * @param resolve The resolve promise.
		 * @param route The base path to the view and controller.
		 * @param controller The controller that contains the template and render information.
		 * @param options The configuration options.
		 * @private
		 */
		_loadTemplate: function (resolve, route, controller, options) {
			if (controller.template !== false) {
				var path = 'text!' + route + 'View.html';
				require([path], function (template) {
					controller.template = Handlebars.compile(template);
					this._renderView(resolve, controller, options);
				}.bind(this));
			} else {
				this._renderView(resolve, controller, options);
			}
		},

		/**
		 * Renders a view by calling the render function of both the loader and the controller.
		 *
		 * @param resolve The resolve promise.
		 * @param controller The controller associated with the view.
		 * @param options The configuration options.
		 * @private
		 */
		_renderView: function (resolve, controller, options) {
			this.render(resolve, controller, options);
			controller.trigger('afterRender');
			controller.trigger('ready');
		}

	});

});
