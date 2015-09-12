define(function (require) {

	var _ = require('underscore');
	var Panel = require('model/Panel');

	var Evidence = Panel.extend({

		defaults: {
			body: 'Evidence',
			score: 0,
			maxscore: 0
		}

	});

	_.extend(Evidence.prototype.defaults, Panel.prototype.defaults);

	return Evidence;

});

