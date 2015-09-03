define(function (require) {
	'use strict';

	var Component = require('core/Component');
	var Button = require('component/button/Button');

	return Component.extend({
		initialize: function () {
			Component.prototype.initialize.apply(this, arguments);

			var buttons = this.collection;
			var n = buttons.size();
			var distanceBetween = 200;
			buttons.each(function (model, i) {
				var button = new Button({
					model: model
				});
				var scale = i - (n - 1) / 2;
				button.position.set(scale * distanceBetween, 0);
				this.add(button);
			}, this);
		}
	});
});
