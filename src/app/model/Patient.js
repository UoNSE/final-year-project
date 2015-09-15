define(function (require) {

	var Backbone = require('backbone');

	return Backbone.Model.extend({

		defaults: {
			name: 'Patient'
		},
		relations: [{
			type: Backbone.HasMany,
			key: 'evidence',
			relatedModel: Evidence

	});

});
