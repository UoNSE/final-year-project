define(function (require) {

	var Backbone = require('backbone');

	return Backbone.Model.extend({

		defaults: {
			heading: 'Heading',
			body: 'Body',
			color: 'default',
			classes: null,
			width: 300,
			height: 100
		}

	});

});

