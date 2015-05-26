define(function (require) {

	var Backbone = require('backbone');
	var Handlebars = require('handlebars');
	var template = require('text!view/Main.html');

	return Backbone.View.extend({
		template: Handlebars.compile(template),
		selector: '#content',
		initialize: function () {
			this.render();
		},
		/**
		 * The render function that is called upon initialisation and when a new partial is being loaded.
		 */
		render: function () {
			var html = this.template();
			$(this.selector).html(html);
		},
		/**
		 *
		 * @param path
		 */
		load: function (path) {
			// Prepend text! to the path so the HTML file can be required.
			path = 'text!' + path;
			// Load the file at the specified path.
			require([path], function (partial) {
				// Switch out and compile the new template.
				this.template = Handlebars.compile(partial);
				// Render the partial.
				this.render();
			}.bind(this));
		}
	});

});
