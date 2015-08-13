define(function (require) {

	'use strict';

	var $ = require('jquery');
	var ViewController = require('controller/ViewController');
	var Animate = require('behaviour/Animate');

	var styles = [
		'case-overview.css'
	];

	return ViewController.extend({

		styles: styles,
		selector: '#case-overview',

		events: {
			'click #case-information': 'onCaseInformation',
			'click #identify-issues': 'onIdentifyIssues',
			'click #goals-and-actions': 'onGoalsAndActions',
			'click #reflection': 'onReflection'
		},

		onAfterRender: function () {
			Animate.scale($(this.selector), {duration: 1000});
			Animate.scale($('#btn-case-overview'), {
				css: {fontSize: 20},
				delay: 500,
				duration: 1000
			});
		},

		onCaseInformation: function () {
			Animate.scaleOut($(this.selector), {
				duration: 500,
				easing: 'easeInBack'
			});
		},

		onIdentifyIssues: function () {
			// TODO
		},

		onGoalsAndActions: function () {
			// TODO
		},

		onReflection: function () {
			// TODO
		}

	});

});
