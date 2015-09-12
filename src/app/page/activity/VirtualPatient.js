define(function (require) {
	'use strict';

	var InventoryPage = require('page/InventoryPage');
	var VirtualPatient = require('component/activity/virtualpatient/VirtualPatient');

	return InventoryPage.extend({
		name: 'virtualpatient',
		initialize: function () {
			InventoryPage.prototype.initialize.apply(this, arguments);
			this.add(new VirtualPatient());
		}
	});
});
