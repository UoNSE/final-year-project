define(function (require) {
	'use strict';

	var Page = require('core/Page');
	var Unlock = require('component/activity/issues/topic/Unlock');

	return Page.extend({
		name: 'topic unlock',
		initialize: function () {
			Page.prototype.initialize.apply(this, arguments);
			this.unlock = this.add(new Unlock());
		},

		onBack: function (event) {
			if (this.unlock.topicSelected !== null){
				event.preventDefault();
				this.unlock.onTopicBack();
			}

		}
	});
});
