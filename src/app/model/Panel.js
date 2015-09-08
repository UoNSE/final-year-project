define(function (require) {

	var Backbone = require('backbone');

	return Backbone.RelationalModel.extend({

		type: Backbone.HasOne,

		defaults: {
			title: 'Title',
			body: '',
			color: 'default',
			classes: null,
			width: null,
			height: null
		}

	});

});
