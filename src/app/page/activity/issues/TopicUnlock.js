define(function (require) {
	'use strict';

	var Page = require('core/Page');
	var InventoryPage = require('page/InventoryPage');
	var Unlock = require('component/activity/issues/topic/Unlock');

	return Page.extend({
		name: 'topic unlock',
		initialize: function () {
			//Page.prototype.initialize.apply(this, arguments);
			InventoryPage.prototype.initialize.apply(this, arguments);
			this.unlock = this.add(new Unlock(this.inventory, this.urlParams));
		},

		onBack: function (event) {
			if (this.unlock.topicSelected !== null){
				event.preventDefault();
				this.unlock.onTopicBack();
			}

		}
	});
});
