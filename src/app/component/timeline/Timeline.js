define(function (require) {
	'use strict';

	var Component = require('core/Component');
	var Button = require('component/button/Button');

	return Component.extend({
		initialize: function (options) {
			Component.prototype.initialize.apply(this, arguments);

			var n = options.buttons.length;
			var distanceBetween = 200;
			options.buttons.forEach(function (buttonOptions, i) {
				var button = new Button({
					model: {
						text: buttonOptions.text
					}
				});
				var scale = i - (n - 1) / 2;
				button.position.set(scale * distanceBetween, 0);
				this.add(button);
			}, this);
		}
	});
});
