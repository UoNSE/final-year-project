define(function (require) {

	var Backbone = require('backbone');
	var Handlebars = require('handlebars');
	var $ = require('jquery');
	var template = require('text!view/Main.html');

	return Backbone.View.extend({
		template: Handlebars.compile(template),
		selector: '#content',
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
		 * @param path The path to the Backbone controller.
		 */
		load: function (path) {
			// Load the controller at the specified path.
			require([path], function (Controller) {
				// Instantiate the controller.
				var controller = new Controller();
				// Switch out and compile the new template.
				this.template = controller.template || '';
				// Get the head from the HTML page.
				var head = $('head');
				// Get the styles from the controller.
				var styles = controller.styles || [];
				// Load necessary CSS files.
				for (var i = 0, len = styles.length; i < len; i++) {
					var css = $('<link rel="stylesheet" type="text/css" href="' + styles[i] + '">');
					head.append(css);
				}
				// Render the partial and the controller.
				this.render();
				if (controller.render) {
					controller.render($(this.selector));
				}
			}.bind(this));
		}
	});

});
