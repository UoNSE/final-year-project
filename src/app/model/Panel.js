define(function (require) {

	var SerializableModel = require('model/SerializableModel');

	return SerializableModel.extend({

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
