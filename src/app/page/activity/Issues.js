define(function (require) {
	'use strict';

	var Object2D = require('core/Object2D');
	var Issues = require('component/activity/issues/Issues');

	return Object2D.extend({
		name: 'issues',
		initialize: function () {
			Object2D.prototype.initialize.apply(this, arguments);
			this.add(new Issues());
		}
	});
});
