define(function (require) {

	var Backbone = require('backbone');
	var Evidence = require('model/Evidence');
	var TestResult = require('model/TestResult');

	return Backbone.RelationalModel.extend({

		defaults: {
			name: 'Patient'
		},

		relations: [{
			type: Backbone.HasMany,
			key: 'evidence',
			relatedModel: Evidence

		},
		// {
		// 	type: Backbone.HasMany,
		// 	key: 'hotspot',
		// 	relatedModel: Hotspot
		//
		// },
		{
			type: Backbone.HasMany,
			key: 'testresults',
			relatedModel: TestResult

		}]

	});

});
