define(function (require) {
	var Backbone = require('backbone');

	return Backbone.Model.extend({
		defaults: {
			width: 100,
			height: 100,
			color: 'black'
		}
	});
});

