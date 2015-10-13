define(function (require) {

	var SerializableModel = require('model/SerializableModel');

	return SerializableModel.extend({

		defaults: {
			name: 'TestType'
		}

	});

});
