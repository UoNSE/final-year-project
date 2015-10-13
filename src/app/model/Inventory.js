define(function (require) {

	var SerializableModel = require('model/SerializableModel');

	var Issue = require('model/Issue');
	var Evidence = require('model/Evidence');
	var IssueGroup = require('model/IssueGroup');

	return SerializableModel.extend({

		defaults: {
			saveScore: 0,
			issues: null,
			evidence: null,
			issuegroup: null
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
			key: 'issuegroups',
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
				this.get('issuegroups').add(model);
			}
			else {
				throw new error('Cannot add model of type', model);
			}
		}

	});


});
