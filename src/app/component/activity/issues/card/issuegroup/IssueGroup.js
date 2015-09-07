define(function (require) {

	'use strict';

	var Card = require('component/activity/issues/card/Card');
	var template = require('text!component/activity/issues/card/issuegroup/IssueGroup.hbs');

	return Card.extend({

		template: template,

		initialize: function () {
			debugger;
			Card.prototype.initialize.apply(this, arguments);
			this.setDroppable({types: Card});
		}

	});

});

