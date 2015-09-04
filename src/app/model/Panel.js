define(function (require) {

	var Backbone = require('backbone');

	return Backbone.Model.extend({

		defaults: {
			title: 'Title',
			body: '',
			color: 'default',
			classes: null,
			width: 300,
			height: 90
		}

	});

});
