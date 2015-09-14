define(function (require) {
	'use strict';

	var Page = require('core/Page');
	var Unlock = require('component/activity/issues/topic/Unlock');

	return Page.extend({
		name: 'topic unlock',
		initialize: function () {
			Page.prototype.initialize.apply(this, arguments);
			this.add(new Unlock());
		}
	});
});
