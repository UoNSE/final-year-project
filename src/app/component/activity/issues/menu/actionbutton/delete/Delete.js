define(function (require) {

	'use strict';

	var ActionButton = require('component/activity/issues/menu/actionbutton/ActionButton');
	var Card = require('component/activity/issues/card/Card');

	return ActionButton.extend({

		initialize: function () {
			ActionButton.prototype.initialize.apply(this, arguments);
			this.setDroppable({types: Card});

		}
	});

});
