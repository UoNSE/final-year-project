define(function (require) {
	'use strict';

	var ActionButton = require('component/actionbutton/ActionButton');
	var Model = require('model/ActionButton');

	return ActionButton.extend({
		detached: true,
		origin: 'top left',
		detachedPageOrigin: 'top left',
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
