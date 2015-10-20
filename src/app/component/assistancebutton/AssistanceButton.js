define(function (require) {
	'use strict';

	var ActionButton = require('component/actionbutton/ActionButton');
	var Hint = require('component/hint/Hint');
	var Model = require('model/ActionButton');
	var Vector2 = require('math/Vector2');

	return ActionButton.extend({
		detached: true,
		origin: 'bottom right',
		pageOrigin: 'bottom right',
		alwaysOnTop: true,
		events: {
			'click': 'onClick'
		},
		calling: false,

		initialize: function (router) {
			ActionButton.prototype.initialize.apply(this, arguments);
			this.model = new Model({
				icon: 'action-accessibility',
				styles: {
					margin: 10
				}
			});
			var hint = this.add(new Hint({
				model: {
					text: 'Assistance'
				}
			}));
			hint.position.x = -80;
			hint.position.y = 22;
			hint.origin = 'bottom right';
		},

		onClick: function () {
			this.calling = !this.calling;

			if (this.calling) {
				this.model.set('color', 'danger');
				this.animation = new TWEEN.Tween(this.scale)
					.to({x: 1.1, y: 1.1}, 1000)
					.easing(TWEEN.Easing.Back.Out)
					.yoyo(true)
					.repeat(Infinity)
					.start()
			} else {
				this.model.set('color', 'primary');
				this.scale.set(1, 1);
				this.animation.stop();
			}
		}
	});

});
