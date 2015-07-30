define(function (require) {

	'use strict';

	var Controller = require('controller/Controller');
	var Animate = require('behaviour/Animate');

	var styles = [
		'case-overview.css'
	];

	return Controller.extend({

		styles: styles,
		selector: '.case-overview',

		render: function () {
			this._bindEvents();
			Animate.scale($(this.selector), {duration: 1000});
		},

		_bindEvents: function () {
			$('#case-information').on('click', this._onCaseInformation.bind(this));
			$('#identify-issues').on('click', this._onIdentifyIssues.bind(this));
			$('#goals-and-actions').on('click', this._onGoalsAndActions.bind(this));
			$('#reflection').on('click', this._onReflection.bind(this));
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
