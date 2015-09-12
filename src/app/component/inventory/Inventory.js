define(function (require) {
	'use strict';

	var Component = require('core/Component');
	var template = require('text!component/inventory/Inventory.hbs');

	return Component.extend({

		template: template,
		styles: ['component/inventory/Inventory.css'],
		classes: ['cpn-inventory']

	});

});
