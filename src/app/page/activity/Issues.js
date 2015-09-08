define(function (require) {
	'use strict';

	var Page = require('core/Page');
	var Issues = require('component/activity/issues/Issues');

	return Page.extend({
		name: 'issues',
		initialize: function () {
			Page.prototype.initialize.apply(this, arguments);
			this.add(new Issues());
		}
	});
});
