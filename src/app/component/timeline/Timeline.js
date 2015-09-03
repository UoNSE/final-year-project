define(function (require) {
	'use strict';

	var Component = require('core/Component');
	var Button = require('component/button/Button');

	return Component.extend({
		buttons: [],
		initialize: function () {
			Component.prototype.initialize.apply(this, arguments);

			this.buttons.forEach(function (button) {
				this.add(new Button({
					model: {
						text: button.text
					}
				}));
			})
		}
	});
});
