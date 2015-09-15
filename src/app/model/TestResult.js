define(function (require) {

	var Backbone = require('backbone');

	return Backbone.RelationalModel.extend({

		defaults: {
			name: 'TestResult'
		}

	});

});
