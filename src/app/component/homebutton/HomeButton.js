define(function (require) {
	'use strict';

	var ActionButton = require('component/actionbutton/ActionButton');
	var Model = require('model/ActionButton');

	return ActionButton.extend({
		detached: true,
		origin: 'bottom center',
		pageOrigin: 'bottom center',
		events: {
			'click': 'onClick'
		},

		initialize: function (router) {
			ActionButton.prototype.initialize.apply(this, arguments);
			this.router = router;
			this.model = new Model({
				icon: 'action-home',
				styles: {
					margin: 10
				}
			});
			this.position.x = 35;
		},

		onClick: function () {
			this.router.navigate('cases/1/overview', {trigger: true});
		}
	});

});
