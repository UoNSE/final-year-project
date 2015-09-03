define(function (require) {
	'use strict';

	var Component = require('core/Component');
	var template = require('text!component/overview/Overview.hbs');

	var Timeline = require('component/timeline/Timeline');

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

			var timeline = this.add(new Timeline({
				buttons: [
					{text: 'Case\nInformation'},
					{text: 'Identify Issues', disabled: true},
					{text: 'Goals and\nActions', disabled: true},
					{text: 'Reflection', disabled: true}
				]
			}));
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
