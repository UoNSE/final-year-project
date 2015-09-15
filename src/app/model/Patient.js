define(function (require) {

	var Backbone = require('backbone');
	var Evidence = require('model/Evidence');
	var TestResult = require('model/TestResult');

	return Backbone.Model.extend({

		defaults: {
			name: 'Patient'
		},
		relations: [{
			type: Backbone.HasMany,
			key: 'evidence',
			relatedModel: Evidence,
			autoFetch: true

		},
		// {
		// 	type: Backbone.HasMany,
		// 	key: 'hotspot',
		// 	relatedModel: Evidence,
		// 	autoFetch: true
		//
		// },
		{
			type: Backbone.HasMany,
			key: 'testresult',
			relatedModel: TestResult,
			autoFetch: true

		}]
	});

});
