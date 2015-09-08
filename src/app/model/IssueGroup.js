define(function (require) {

	//var _ = require('underscore');
	var Backbone = require('backbone');

	var Issue = require('model/Issue');
	var Evidence = require('model/Evidence');
	//var Panel = require('model/Panel');

	var IssueGroup = Backbone.RelationalModel.extend({

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
			//,
			//collectionType: 'AnimalCollection',
			//reverseRelation: {
			//	key: 'livesIn',
			//	includeInJSON: 'id'
				// 'relatedModel' is automatically set to 'Zoo'; the 'relationType' to 'HasOne'.
			//}
		}]

	});

	//_.extend(IssueGroup.prototype.defaults, Panel.prototype.defaults);

	return IssueGroup;

});
