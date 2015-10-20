define(function (require) {
	'use strict';

	var ActionButton = require('component/actionbutton/ActionButton');
	var Model = require('model/ActionButton');
	var Hint = require('component/hint/Hint');

	return ActionButton.extend({
		detached: true,
		origin: 'bottom center',
		pageOrigin: 'bottom center',
		alwaysOnTop: true,
		events: {
			'click': 'onClick'
		},

		initialize: function (router) {
			ActionButton.prototype.initialize.apply(this, arguments);
			this.router = router;
			this.model = new Model({
				icon: 'navigation-arrow-back',
				styles: {
					margin: 10
				}
			});
			this.position.x = -35;

			this.captionHint = this.add(new Hint({model: {text: 'Back'}}));
			this.captionHint.origin = 'bottom center';
			this.captionHint.pageOrigin = 'bottom center';
			this.captionHint.detached = true;
			this.captionHint.position.x = this.position.x - 32;
			this.captionHint.position.y = this.position.y + 24;
		},

		onClick: function () {
			var goBack = true;
			var event = {
				preventDefault: function () {
					goBack = false;
				}
			};
			this.trigger('back', event);
			if (goBack) {
				this.router.back();
			}
		}
	});

});
