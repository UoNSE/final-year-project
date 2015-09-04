define(function (require) {

	'use strict';

	var ActionButton = require('component/activity/issues/menu/actionbutton/ActionButton');
	var Merge = require('component/activity/issues/card/merge/Merge');

	return ActionButton.extend({

		initialize: function () {
			ActionButton.prototype.initialize.apply(this, arguments);
			this.setDroppable({types: Merge});
		}

	});

});
