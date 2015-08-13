define(function (require) {

	var $ = require('jquery');

	var Loader = require('controller/loader/Loader');
	var Cases = require('collection/Cases');

	return Loader.extend({

		selector: 'body',

		/**
		 * The render function that is called when a new partial is being loaded.
		 *
		 * @param controller The controller that contains the template and model information.
		 * @param options
		 */
		render: function (controller, options) {
			options = options || {};

			var selector = options.selector;
			var $element = selector ? $(selector) : $(this.selector);
			var index = options.index;

			// Either replace the html inside the element or insert the content at the specified index.
			if (index === undefined) {
				$element.append(controller.$el);
			} else {
				$element.insertAt(index, controller.$el);
			}

			if (controller.onAfterRender) {
				controller.onAfterRender();
			}

			this.trigger('afterRender', controller);

		},

		/**
		 * Loads a partial given the route.
		 *
		 * @param route The route that maps to the Backbone view and controller.
		 * @param [element] An element to replace the HTML of.
		 */
		add: function (route, element) {
			return this._loadController(route, {
				element: element
			});
		},

		/**
		 * Inserts a partial given the route, element and index.
		 *
		 * @param route The current route.
		 * @param index The index to insert the view into the element.
		 * @param [element] The element that will have a view inserted.
		 * @returns {Promise}
		 */
		insert: function (route, index, element) {
			return this._loadController(route, {
				element: element,
				index: index
			});
		}

	});

});
