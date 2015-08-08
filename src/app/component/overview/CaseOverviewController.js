define(function (require) {

	'use strict';

	var $ = require('jquery');
	var ViewController = require('controller/ViewController');
	var animate = require('behaviour/Animate').getInstance();

	var styles = [
		'case-overview.css'
	];

	return ViewController.extend({

		styles: styles,
		selector: '#case-overview',

		events: {
			'click #case-information': '_onCaseInformation',
			'click #identify-issues': '_onIdentifyIssues',
			'click #goals-and-actions': '_onGoalsAndActions',
			'click #reflection': '_onReflection'
		},

		_onAfterRender: function () {
			animate.scale($(this.selector), {duration: 1000});
			animate.scale($('#btn-case-overview'), {
				css: {fontSize: 20},
				delay: 500,
				duration: 1000
			});
		},

		_onCaseInformation: function () {
			animate.scaleOut($(this.selector), {
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
