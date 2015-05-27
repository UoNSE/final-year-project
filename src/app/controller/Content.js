define(function (require) {

	var Backbone = require('backbone');
	var Handlebars = require('handlebars');
	var $ = require('jquery');
	var template = require('text!view/Main.html');

	return Backbone.View.extend({
		template: Handlebars.compile(template),
		previous: [],
		selector: '#content',
		/**
		 * The render function that is called upon initialisation and when a new partial is being loaded.
		 */
		render: function () {
			var html = this.template ? this.template() : '';
			$(this.selector).html(html);
		},
		/**
		 * Loads the previous controller.
		 */
		loadPrevious: function () {
			this.load(this.previous[this.previous.length - 1], false);
			this.previous.pop();
		},
		/**
		 * Loads a controller that contains the template, styles and scripts to load.
		 *
		 * @param path The path to the Backbone controller.
		 */
		load: function (path, isPrevious) {
			// Load the controller at the specified path.
			require([path], function (Controller) {
				// Add the previous path if the current path exists.
				if (this.path && isPrevious !== false) {
					this.previous.push(this.path);
				}
				this.path = path;
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
