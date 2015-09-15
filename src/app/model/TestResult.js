define(function (require) {

	var Backbone = require('backbone');

	return Backbone.RelationalModel.extend({

		type: Backbone.HasOne,
		defaults: {
			name: 'TestResult'
		}

	});

});
