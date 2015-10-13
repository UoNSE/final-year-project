define(function (require) {

	var SerializableModel = require('model/SerializableModel');

	return SerializableModel.extend({

		defaults: {
			//name: 'Hotspot',
			patientId: null,
			x: 0,
			y: 0,
			data: ''
		}

	});

});
