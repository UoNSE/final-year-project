define(function (require) {

	var Backbone = require('backbone');

	return Backbone.Model.extend({

		defaults: {
			color: 'primary',
			icon: 'content-add'
		}

	});

});

