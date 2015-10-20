define(function (require) {

	var Backbone = require('backbone');

	return Backbone.RelationalModel.extend({

		type: Backbone.HasOne,

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
