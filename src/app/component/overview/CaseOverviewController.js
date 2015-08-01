define(function (require) {

	'use strict';

	var $ = require('jquery');
	var Controller = require('controller/Controller');
	var Animate = require('behaviour/Animate');

	var styles = [
		'case-overview.css'
	];

	return Controller.extend({

		styles: styles,
		selector: '.case-overview',

		events: {
			'click #case-information': '_onCaseInformation',
			'click #identify-issues': '_onIdentifyIssues',
			'click #goals-and-actions': '_onGoalsAndActions',
			'click #reflection': '_onReflection'
		},

		render: function () {
			Animate.scale($(this.selector), {duration: 1000});
		},

		_onCaseInformation: function () {
			Animate.scaleOut($(this.selector), {
				duration: 500,
				easing: 'easeInBack'
			});
		},

		_onIdentifyIssues: function () {
			// TODO
		},

		_onGoalsAndActions: function () {
			// TODO
		},

		_onReflection: function () {
			// TODO
		}

	});

});
