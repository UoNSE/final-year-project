define(function (require) {

	var Backbone = require('backbone');

	return Backbone.Model.extend({

		defaults: {
			//name: 'Hotspot',
			patientId: null,
			x: 0,
			y: 0,
			data: ''
		}

	});

});
