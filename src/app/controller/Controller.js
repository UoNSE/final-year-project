define(function (require) {

	var Backbone = require('backbone');
	var Content = require('controller/Content');

	return Backbone.View.extend({
		content: new Content(),
		/**
		 * Load the specified controller with the content.
		 *
		 * @param path The path to the controller.
		 */
		load: function (path) {
			this.content.load(path);
		}
	});

});
