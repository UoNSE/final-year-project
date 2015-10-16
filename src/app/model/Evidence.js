define(function (require) {

	var _ = require('underscore');
	var Panel = require('model/Panel');

	var Evidence = Panel.extend({});

	_.extend(Evidence.prototype.defaults, Panel.prototype.defaults, {
		body: 'Evidence',
		score: 0,
		maxscore: 0,
		issueid: 0
	});

	return Evidence;

});

