define(function (require) {

	var SerializableModel = require('model/SerializableModel');

	return SerializableModel.extend({

		type: Backbone.HasOne,
		defaults: {
			name: 'TestResult'
		}

	});

});
