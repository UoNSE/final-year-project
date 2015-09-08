define(function (require) {

	var Backbone = require('backbone');

	return Backbone.RelationalModel.extend({

		defaults: {
			content: 'This is evidence'
		}

	});

});
