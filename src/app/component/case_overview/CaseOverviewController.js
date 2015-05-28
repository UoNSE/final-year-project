define(function (require) {

	'use strict';

	var Controller = require('controller/Controller');
	var Animate = require('behaviour/Animate');

	var template = require('text!component/case_overview/CaseOverviewView.html');
	var styles = [
		'../resources/css/case-overview.css'
	];

	return Controller.extend({

		template: template,
		styles: styles,

		render: function () {
			this._bindEvents();
			Animate.scale($('.case-overview'), {duration: 1000});
		},

		_bindEvents: function () {
			$('#case-information').on('click', this._onCaseInformation.bind(this));
			$('#identify-issues').on('click', this._onIdentifyIssues.bind(this));
			$('#goals-and-actions').on('click', this._onGoalsAndActions.bind(this));
			$('#reflection').on('click', this._onReflection.bind(this));
		},

		_onCaseInformation: function () {
			Animate.scale($('.case-overview'), {
				duration: 500,
				easing: 'easeInBack',
				complete: function () {
					this.load('component/case_information/CaseInformationController');
				}.bind(this)
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
