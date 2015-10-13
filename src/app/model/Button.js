define(function (require) {

	var SerializableModel = require('model/SerializableModel');

	return SerializableModel.extend({

		defaults: {
			text: '',
			color: 'primary',
			disabled: false,
			href: null,
			classes: null,
			styles: null
		}

	});

});
