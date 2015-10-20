define(function (require) {

	'use strict';

	var Card = require('component/activity/issues/card/EscapedCard');
	var template = require('text!component/activity/issues/card/issuegroup/IssueGroup.hbs');
	var Issue = require('component/activity/issues/card/issue/Issue');
	var Evidence = require('component/activity/issues/card/evidence/Evidence');

	return Card.extend({

		template: template,

		initialize: function () {
			Card.prototype.initialize.apply(this, arguments);
			this.setDroppable({types: [Card]});
		}

	});

});

