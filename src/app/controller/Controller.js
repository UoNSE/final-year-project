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

		back: function () {
			this.trigger('back');
		}

	});

});
