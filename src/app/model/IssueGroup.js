define(function (require) {

	var Backbone = require('backbone');

	var Issue = require('model/Issue');
	var Evidence = require('model/Evidence');

	return Backbone.RelationalModel.extend({

		defaults: {
			issue: null,
			evidence: null
		},

		relations: [{
			type: Backbone.HasOne,
			key: 'issue',
			relatedModel: Issue
		}, {
			type: Backbone.HasMany,
			key: 'evidence',
			relatedModel: Evidence
		}]

	});

});
