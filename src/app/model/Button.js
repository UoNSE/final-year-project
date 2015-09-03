define(function (require) {

	var Backbone = require('backbone');

	return Backbone.Model.extend({

		defaults: {
			text: 'button',
			disabled: false
		}

	});

});
