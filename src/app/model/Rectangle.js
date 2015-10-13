define(function (require) {
	var SerializableModel = require('model/SerializableModel');

	return SerializableModel.extend({
		defaults: {
			width: 100,
			height: 100,
			color: 'black'
		}
	});
});

