define(function (require) {
	'use strict';

	var InventoryPage = require('page/InventoryPage');
	var Issues = require('component/activity/issues/Issues');

	return InventoryPage.extend({
		name: 'issues',
		initialize: function () {
			InventoryPage.prototype.initialize.apply(this, arguments);
			this.add(new Issues());
		}
	});
});
