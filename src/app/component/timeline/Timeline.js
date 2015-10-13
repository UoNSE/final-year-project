define(function (require) {
	'use strict';

	let Component = require('core/Component');
	let ActionButton = require('component/actionbutton/ActionButton');
	let Rectangle = require('component/sprite/rectangle/Rectangle');
	let RectangleModel = require('model/Rectangle');

	return Component.extend({
		classes: 'timeline',
		styles: 'component/timeline/Timeline.css',

		initialize: function (width, height) {
			Component.prototype.initialize.apply(this, arguments);
			let buttons = this.collection;
			let n = buttons.size();
			let distanceBetween = 200;

			for (let i = 0; i < n; i++) {
				if (i < n - 1) {
					let line = new Rectangle({
						model: new RectangleModel({
							width: distanceBetween,
							height: 5,
							color: '#333'
						})
					});
					let scale = i - (n - 2) / 2;
					line.position.set(scale * distanceBetween, 0);
					this.add(line);
				}
			}

			buttons.each(function (model, i) {
				let button = new ActionButton({
					model: model
				});
				let scale = i - (n - 1) / 2;
				button.position.set(scale * distanceBetween, 0);
				this.add(button);
			}, this);
		}
	});
});
