define(function (require) {

	var Backbone = require('backbone');
	var Handlebars = require('handlebars');
	var $ = require('jquery');

	return Backbone.View.extend({

		selector: '#content',
		_baseStylePath: '../resources/css/',

		/**
		 * The render function that is called upon initialisation and when a new partial is being loaded.
		 */
		render: function () {
			var html = this.template ? this.template() : '';
			$(this.selector).html(html);
		},

		/**
		 * Loads a controller that contains the template, styles and scripts to load.
		 *
		 * @param route The route that maps to the Backbone view and controller.
		 */
		load: function (route) {
			var path = route + 'Controller';
			// Load the controller at the specified path.
			require([path], function (Controller) {
				// Instantiate the controller.
				var controller = new Controller();
				// Trigger the back event for any listeners.
				this.trigger('configureBack', controller.back);
				// Bind the events of the controller and load the styles and template.
				this._bindEvents(controller);
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
			controller.on({
				back: this._onBack.bind(this)
			});
		},

		/**
		 * An event triggered when a controller requests to go back a page. This method bubbles the event up.
		 *
		 * @private
		 */
		_onBack: function (event) {
			debugger;
			this.trigger('back');
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
		}

	});

});
