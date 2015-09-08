define(function (require) {
	'use strict';

	var Component = require('core/Component');
	var ActionButton = require('component/actionbutton/ActionButton');

	return Component.extend({
		classes: 'timeline',
		styles: 'component/timeline/Timeline.css',

		initialize: function (width, height) {
			Component.prototype.initialize.apply(this, arguments);
			var buttons = this.collection;
			var n = buttons.size();
			var distanceBetween = 200;
			buttons.each(function (model, i) {
				var button = new ActionButton({
					model: model
				});
				var scale = i - (n - 1) / 2;
				button.position.set(scale * distanceBetween, 0);
				this.add(button);
			}, this);
		}
	});
});
