define(function (require, exports, module) {

	var SerializableModel = require('model/SerializableModel');

	var Issue = require('model/Issue');
	var Evidence = require('model/Evidence');
	var IssueGroup = require('model/IssueGroup');

	return SerializableModel.extend({

		id: module.id,
		defaults: {
			saveScore: 0,
			issues: null,
			evidence: null,
			issueGroups: null
		},

		relations: [{
			type: Backbone.HasMany,
			key: 'issues',
			relatedModel: Issue
		}, {
			type: Backbone.HasMany,
			key: 'evidence',
			relatedModel: Evidence
		}, {
			type: Backbone.HasMany,
			key: 'issueGroups',
			relatedModel: IssueGroup
		}],

		add: function (model) {
			if (model instanceof Issue) {
				this.get('issues').add(model);
			}
			else if (model instanceof Evidence) {
				this.get('evidence').add(model);
			}
			else if (model instanceof IssueGroup) {
				this.get('issueGroups').add(model);
			}
			else {
				throw new error('Cannot add model of type', model);
			}
		}

	});


});
