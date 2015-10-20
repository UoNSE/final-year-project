define(function (require) {

	'use strict';

	var Component = require('core/Component');
	var template = require('text!component/actionbutton/ActionButton.hbs');

	var ActionButton = require('model/ActionButton');

	return Component.extend({

		template: template,

		initialize: function () {
			Component.prototype.initialize.apply(this, arguments);
			this.model = new ActionButton({
				text: 'Touch to Start',
				color: 'danger',
				href: 'cases',
				styles: {
					width: 200,
					height: 200
				}
			});
		}

	});

});
