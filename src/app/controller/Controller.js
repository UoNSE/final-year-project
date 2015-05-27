define(function (require) {

	var Backbone = require('backbone');
	var Content = require('controller/Content');

	return Backbone.View.extend({
		content: new Content(),
		/**
		 * Loads the previously displayed controller from the content.
		 */
		loadPrevious: function () {
			this.content.loadPrevious();
		},
		/**
		 * Load the specified controller from the content.
		 *
		 * @param path The path to the controller.
		 */
		load: function (path) {
			this.content.load(path);
		}
	});

});
