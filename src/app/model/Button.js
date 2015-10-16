define(function (require) {

	var Backbone = require('backbone');

	return Backbone.Model.extend({

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
