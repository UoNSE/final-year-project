define(function (require) {
	'use strict';

	var InventoryPage = require('page/InventoryPage');
	var Issues = require('component/activity/issues/Issues');

	return InventoryPage.extend({
		name: 'issues',
		title: 'Issues & Evidence',
		initialize: function () {
			InventoryPage.prototype.initialize.apply(this, arguments);
			this.add(new Issues(this.inventory, {
				params: {
					case_id: this.urlParams.case_id
				}
			}));
		}
	});
});
