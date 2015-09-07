define(function (require) {

	var _ = require('underscore');
	var Panel = require('model/Panel');

	var IssueGroup = Panel.extend({

		defaults: {
			issue: null,
			evidence: null
		}

	});

	_.extend(IssueGroup.prototype.defaults, Panel.prototype.defaults);

	return IssueGroup;

});
