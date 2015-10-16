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
			let buttons = this.model.get('buttons');
			let distanceBetween = 200;

			this.addLines(buttons.size(), distanceBetween);
			this.addButtons(buttons, distanceBetween);

			this.listenTo(this.model, 'change', this.onChange.bind(this));
			this.model.set('complete', 0);
		},

		addLines: function (size, width) {
			for (let i = 0; i < size - 1; i++) {
				let line = new Rectangle({
					model: new RectangleModel({
						width: width,
						height: 5,
						color: '#333'
					})
				});
				let scale = i - (size - 2) / 2;
				line.position.set(scale * width, 0);
				this.add(line);
			}
		},

		addButtons: function (buttons, distanceBetween) {
			let size = buttons.size();
			buttons.each(function (model, i) {
				let button = new ActionButton({
					model: model
				});
				let scale = i - (size - 1) / 2;
				button.position.set(scale * distanceBetween, 0);
				this.add(button);
			}, this);
		},

		onChange: function (model) {
			let complete = model.get('complete');
			let buttons = model.get('buttons');
			for (let i = 0, len = complete; i < len; i++) {
				let button = buttons.at(i);
				if (button.get('disabled')) {
					button.set('disabled', false);
				}
				if (button.get('color') === 'primary') {
					button.set('color', 'success');
				}
			}

			if (complete < buttons.size()) {
				buttons.at(complete).set('disabled', false);
			}

		}

	});
});
