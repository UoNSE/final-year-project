define(function (require) {
	'use strict';

	var Component = require('core/Component');
	var template = require('text!component/overview/Overview.hbs');

	var Buttons = require('collection/Buttons');
	var Timeline = require('component/timeline/Timeline');
	var Hint = require('component/hint/Hint');

	return Component.extend({

		template: template,
		styles: 'case-overview.css',

		events: {
			//'click #case-information': 'onCaseInformation',
			//'click #identify-issues': 'onIdentifyIssues',
			//'click #goals-and-actions': 'onGoalsAndActions',
			//'click #reflection': 'onReflection'
		},

		initialize: function () {
			Component.prototype.initialize.apply(this, arguments);

			this.add(new Timeline({
				collection: new Buttons([
					{text: 'Case Information'},
					{text: 'Identify Issues', disabled: true},
					{text: 'Goals and Actions', disabled: true},
					{text: 'Reflection', disabled: true}
				])
			}));
			var hint = this.add(new Hint({
				model: {
					text: 'Tap an activity below'
				}
			}));
			hint.position.y = 100;
		},

		onCaseInformation: function () {
			// TODO
			//Animate.scaleOut($(this.selector), {
			//	duration: 500,
			//	easing: 'easeInBack'
			//});
		},

		onIdentifyIssues: function () {
			// TODO
		},

		onGoalsAndActions: function () {

		},

		onReflection: function () {
			// TODO
		}

	});

});
