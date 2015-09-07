define(function (require) {

	'use strict';

	var ActionButton = require('component/activity/issues/menu/actionbutton/ActionButton');
	var IssueGroup = require('component/activity/issues/card/issuegroup/IssueGroup');

	return ActionButton.extend({

		initialize: function () {
			ActionButton.prototype.initialize.apply(this, arguments);
			this.setDroppable({types: IssueGroup});
		}

	});

});
