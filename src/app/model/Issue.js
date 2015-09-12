define(function (require) {

	var _ = require('underscore');
	var Panel = require('model/Panel');

	var Issue = Panel.extend({

		defaults: {
			body: 'Issue',
			cost: 0
		}

	});

	_.extend(Issue.prototype.defaults, Panel.prototype.defaults);

	return Issue;

});
