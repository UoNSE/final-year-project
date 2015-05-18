define(function (require) {

	var Backbone = require('backbone');

	return Backbone.Model.extend({
		defaults: {
			name: 'Bill Smith',
			age: 33
		}
	});

});
