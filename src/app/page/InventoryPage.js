define(function (require) {
	'use strict';

	var Page = require('core/Page');
	var Inventory = require('component/inventory/Inventory');

	return Page.extend({
		name: 'inventory_page',
		initialize: function () {
			Page.prototype.initialize.apply(this, arguments);

			var inventory = this.add(new Inventory());
			this.camera.position.x = inventory.width / 2;
		}
	});
});
