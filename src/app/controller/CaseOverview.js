define(function (require) {

	var Controller = require('controller/Controller');
	var Handlebars = require('handlebars');
	var template = require('text!view/CaseOverview.html');
	var styles = [
		'../resources/css/case-overview.css'
	];

	return Controller.extend({
		template: Handlebars.compile(template),
		styles: styles,
		render: function () {
			this.bindEvents();
			// Add a transition to the case overview.
			$('.case-overview').css({
				transform: 'scale(0)'
			}).animate({
				transform: 'scale(1)'
			}, {
				duration: 1000,
				easing: 'easeOutElastic'
			});
		},
		bindEvents: function () {
			$('#case-information').on('click', this.onCaseInformation.bind(this));
			$('#identify-issues').on('click', this.onIdentifyIssues.bind(this));
			$('#goals-and-actions').on('click', this.onGoalsAndActions.bind(this));
			$('#reflection').on('click', this.onReflection.bind(this));
		},
		onCaseInformation: function () {
			this.load('controller/CaseInformation');
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
