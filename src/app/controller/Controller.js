define(function (require) {

	var Backbone = require('backbone');
	var Handlebars = require('handlebars');

	return Backbone.View.extend({

		initialize: function () {
			// Set the back state.
			this.back = this.back === undefined ? true : this.back;
			// Check if the template has not been compiled.
			if (typeof this.template === 'string') {
				this.template = Handlebars.compile(this.template);
			}
		},

		/**
		 * Triggers the add event so a template within the controller can be added to the element.
		 *
		 * @param path The path to the controller.
		 * @param element The HTML element.
		 */
		add: function (path, element) {
			this.trigger('add', path, element);
		},

		/**
		 * Load the specified controller from the content.
		 *
		 * @param path The path to the controller.
		 */
		load: function (path) {
			this.trigger('load', path);
		}

	});

});
