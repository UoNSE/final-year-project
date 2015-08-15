define(function (require) {

	var Backbone = require('backbone');
	var Handlebars = require('handlebars');
	var $ = require('jquery');

	var Cases = require('collection/Cases');
	

	return Backbone.View.extend({

		selector: '#content',
		_baseStylePath: 'resources/css/',

		initialize: function (router) {
            this._cases = new Cases();
			//// Wait for the cases to load.
			//this.listenTo(this._cases, 'sync', function (cases) {
			//	console.log('sync');
			//});
			// Fetch the cases data.
			this._cases.fetch();
            this._router = router;
		},

		/**
		 * The render function that is called when a new partial is being loaded.
		 *
		 * @param controller The controller that contains the template and model information.
		 * @param resolve The resolve promise.
		 * @param options The configuration options.
		 */
		render: function (controller, resolve, options) {
			options = options || {};
			var element = options.element || $(this.selector);
			var index = options.index;
			var html = '';
			//  Check if the controller contains a template.
			if (controller.template) {
				// Get the collection or model from the controller.
				var dataModel = controller.collection || controller.model;
				// Set the html based on whether the controller contains a data model.
				if (dataModel) {
					html = controller.template(dataModel.toJSON());
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

            this.linkify(controller.$el);

			controller.trigger('afterRender');
			controller.delegateEvents();

			if (resolve) {
				resolve(controller);
			}
		},

        /**
         * Convert all child anchor tags in the given element to use the backbone's router navigate method.
         * This means links load partial content dynamically rather than loading entire new pages.
         *
         * @param element The element to replace anchor tags within.
         */
        linkify: function (element) {

            var anchors = element.find('a');
            anchors.each(function (index, anchor) {
                var $anchor = $(anchor);
                $anchor.on('click', function (e) {
                    if (e.altKey || e.ctrlKey || e.shiftKey) {
                        // Allow special browser functions, open in new tab/window etc.
                        e.stopPropagation();
                        return;
                    }
                    // Prevent page from actually loading a new URL.
                    e.preventDefault();
                    // Use the router navigation method instead, using the History API to simulate updating the URL.
                    this._router.navigate($anchor.attr('href'), {trigger: true});
                }.bind(this));
            }.bind(this));

        },

		/**
		 * Loads a partial given the route.
		 *
		 * @param route The route that maps to the Backbone view and controller.
		 * @param [id] The current id of the route.
		 * @param [element] An element to replace the HTML of.
		 * @returns {Promise}
		 */
		load: function (route, id, element) {
			return new Promise(function (resolve) {
				this._loadController(resolve, route, {
					id: id,
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
				this._loadDataModels(controller, options.id).then(function () {
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
		 * @param id The id of the current case.
		 * @private
		 */
		_loadDataModels: function (controller, id) {
			return Promise.all([
				this._loadCollection(controller),
				this._loadModel(controller, id)
			]);
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
			return new Promise(function (resolve) {
				if (route) {
					var path = key + '/' + route;
					require([path], function (Collection) {
						// Instantiate the collection and fetch its data if it contains a url.
						var collection = new Collection();
						if (collection.url) {
							collection.fetch();
						}
						// Replace the collection of the controller with the actual collection and resolve the promise.
						controller.collection = collection;
						resolve();
					});
				} else {
					// Nothing to load, resolve the promise.
					resolve();
				}
			}.bind(this));
		},

		/**
		 * Loads a model to the specified controller.
		 *
		 * @param controller The controller that contains the model.
		 * @param id The id of the route.
		 * @returns {Promise}
		 * @private
		 */
		_loadModel: function (controller, id) {
			var key = 'model';
			var route = controller[key];
			// Set the model of the controller.
			controller.model = new Backbone.Model();
			// Check if an id exists and set the case of the model.
			if (id) {
				controller.model.set('case', this._cases.get(id));
			}
			// Resolve loading the model.
			return new Promise(function (resolve) {
				if (route) {
					var path = key + '/' + route;
					require([path], function (Model) {
						// Get the name of the model.
						var name = route.split('/').pop().toLowerCase();
						// Instantiate the model and fetch its data if it contains a url.
						var model = new Model();
						if (model.has('url')) {
							model.fetch();
						}
						// Set the model using its name.
						controller.model.set(name, model);
						// Resolve the promise.
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
					this._renderView(controller, resolve, options);
				}.bind(this));
			} else {
				this._renderView(controller, resolve, options);
			}
		},

		/**
		 * Renders a view by calling the render function of both the loader and the controller.
		 *
		 * @param controller The controller associated with the view.
		 * @param resolve The resolve promise.
		 * @param options The configuration options.
		 * @private
		 */
		_renderView: function (controller, resolve, options) {
			this.render(controller, resolve, options);
			controller.trigger('ready');
		}

	});

});
